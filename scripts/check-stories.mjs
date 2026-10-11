#!/usr/bin/env node
// Рантайм-проверка историй Storybook по статической сборке.
// Флаги: --dir <путь> (по умолчанию storybook-static), --ids a,b, --interact <id>:<css> (повторяемый).
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { chromium } from 'playwright-core'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.map': 'application/json'
}

function parseArgs(argv) {
  const opts = { dir: 'storybook-static', ids: null, interact: new Map() }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dir') opts.dir = argv[++i]
    else if (a === '--ids') opts.ids = argv[++i].split(',').map(s => s.trim()).filter(Boolean)
    else if (a === '--interact') {
      const v = argv[++i] ?? ''
      const k = v.indexOf(':')
      if (k < 1) throw new Error(`--interact ожидает <id>:<css>, получено "${v}"`)
      const id = v.slice(0, k)
      if (!opts.interact.has(id)) opts.interact.set(id, [])
      opts.interact.get(id).push(v.slice(k + 1))
    } else throw new Error(`Неизвестный аргумент: ${a}`)
  }
  return opts
}

function startServer(root) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    let file = path.join(root, urlPath)
    if (!file.startsWith(root)) { res.writeHead(403).end(); return }
    if (existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!existsSync(file)) { res.writeHead(404).end('not found'); return }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  return new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => resolve(server))
  })
}

function findBrowser() {
  if (existsSync('/usr/bin/google-chrome')) return { executablePath: '/usr/bin/google-chrome' }
  const base = path.join(homedir(), '.cache', 'ms-playwright')
  if (existsSync(base)) {
    for (const d of fs.readdirSync(base).filter(n => n.startsWith('chromium')).sort().reverse()) {
      for (const rel of ['chrome-linux/chrome', 'chrome-linux/headless_shell']) {
        const p = path.join(base, d, rel)
        if (existsSync(p)) return { executablePath: p }
      }
    }
  }
  throw new Error('Не найден браузер: /usr/bin/google-chrome или ~/.cache/ms-playwright')
}

async function readErrorScreen(page) {
  return page.evaluate(() => {
    if (!document.body.classList.contains('sb-show-errordisplay')) return null
    const el = document.querySelector('#error-message')
    const stack = document.querySelector('#error-stack')
    return ((el?.textContent ?? '') + ' ' + (stack?.textContent ?? '').slice(0, 300)).trim() || '(пустой экран ошибки)'
  })
}

async function checkStory(context, baseUrl, id, selectors) {
  const page = await context.newPage()
  const pageErrors = []
  const consoleErrors = []
  const errorScreens = []
  page.on('pageerror', e => pageErrors.push(String(e.message ?? e).split('\n')[0]))
  page.on('console', m => { if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) consoleErrors.push(m.text().split('\n')[0]) })
  page.on('response', r => { if (r.status() >= 400) consoleErrors.push(`HTTP ${r.status()} ${r.url().replace(/^https?:\/\/[^/]+/, '')}`) })
  try {
    await page.goto(`${baseUrl}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`, { waitUntil: 'load' })
    await page.waitForTimeout(900)
    let scr = await readErrorScreen(page)
    if (scr) errorScreens.push(scr)
    for (const sel of selectors) {
      try {
        await page.locator(sel).first().click({ timeout: 5000 })
      } catch (e) {
        pageErrors.push(`interact "${sel}": ${String(e.message).split('\n')[0]}`)
        continue
      }
      await page.waitForTimeout(700)
      scr = await readErrorScreen(page)
      if (scr) errorScreens.push(`после клика "${sel}": ${scr}`)
    }
  } catch (e) {
    pageErrors.push(`navigation: ${String(e.message).split('\n')[0]}`)
  } finally {
    await page.close().catch(() => {})
  }
  const failed = pageErrors.length > 0 || errorScreens.length > 0
  return { id, failed, pageErrors, errorScreens, consoleErrors }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const root = path.resolve(opts.dir)
  const indexFile = path.join(root, 'index.json')
  if (!existsSync(indexFile)) throw new Error(`Нет ${indexFile}: сначала соберите витрину`)
  const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'))
  const all = Object.values(index.entries ?? index.stories ?? {}).filter(e => e.type === 'story' || e.type === undefined).map(e => e.id)
  const ids = opts.ids ?? all

  let server, browser, results = []
  try {
    server = await startServer(root)
    const baseUrl = `http://127.0.0.1:${server.address().port}`
    browser = await chromium.launch({ ...findBrowser(), headless: true })
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    for (const id of ids) results.push(await checkStory(context, baseUrl, id, opts.interact.get(id) ?? []))
  } finally {
    await browser?.close().catch(() => {})
    await new Promise(r => (server ? server.close(() => r()) : r()))
  }

  const short = (s, n = 140) => (s.length > n ? s.slice(0, n - 1) + '…' : s)
  const idW = Math.max(2, ...results.map(r => r.id.length))
  console.log(`${'id'.padEnd(idW)} | исход | ошибки консоли`)
  for (const r of results) {
    const outcome = r.failed ? 'FAIL' : 'ok'
    const cons = r.consoleErrors.length ? `${r.consoleErrors.length}: ${short(r.consoleErrors[0])}` : '0'
    console.log(`${r.id.padEnd(idW)} | ${outcome.padEnd(5)} | ${cons}`)
  }
  const failed = results.filter(r => r.failed)
  const withCons = results.filter(r => r.consoleErrors.length)
  console.log(`\nИсторий: ${results.length}, упало: ${failed.length}, с ошибками консоли: ${withCons.length}`)
  for (const r of failed) {
    console.log(`\nFAIL ${r.id}`)
    for (const e of r.pageErrors) console.log(`  pageerror: ${short(e, 400)}`)
    for (const e of r.errorScreens) console.log(`  экран ошибки: ${short(e, 400)}`)
  }
  if (failed.length) process.exitCode = 1
}

main().catch(e => {
  console.error(e.stack ?? e)
  process.exit(1)
})
