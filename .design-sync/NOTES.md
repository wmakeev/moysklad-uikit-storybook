# design-sync NOTES — @moysklad/uikit

## Тип репозитория (важно!)
Это репозиторий-**витрина** (Storybook), а НЕ исходники uikit. Реальные компоненты — готовый
`node_modules/@moysklad/uikit/dist`. Поэтому:
- `buildCmd` пустой (пакет уже собран, ничего не пересобираем).
- Конвертер запускается с `--entry ./node_modules/@moysklad/uikit/dist/index.js` и
  `--node-modules ./node_modules` (react/react-dom в корневом node_modules).
- Шейп: storybook. Глобал бандла: `window.MoyskladUikit`.

## Команды (из корня репо)
```sh
# 1) при изменении историй/DS — пересобрать референс:
npx storybook build -c .storybook -o "$PWD/.design-sync/sb-reference"
# 2) конвертер:
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./node_modules/@moysklad/uikit/dist/index.js --out ./ds-bundle
# 3) валидатор:
node .ds-sync/package-validate.mjs ./ds-bundle
# 4) сверка превью с референсом (scoped):
node .ds-sync/storybook/compare.mjs --out ./ds-bundle --storybook-static .design-sync/sb-reference --components A,B,C
# драйвер-рецепт (финальный прогон; первый синк — без --remote):
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --entry ./node_modules/@moysklad/uikit/dist/index.js --out ./ds-bundle
```

## Решения в config.json и ПОЧЕМУ
- **Истории**: переделаны из тематических в покомпонентные (`src/stories/catalog/<Name>.stories.tsx`,
  `title: 'Компоненты/<Group>/<Name>'`). Конвертер мапит ПОСЛЕДНИЙ сегмент title на имя экспорта;
  группа берётся из сегмента ПЕРЕД именем и ДОЛЖНА быть латиницей (кириллица → слаг пустой → `misc`).
  Старые тематические истории (`src/stories/components/*`) удалены. Оставлены: tokens/*, Introduction.mdx, demos/*.
- **extraEntries: `../../../.design-sync/extra-exports.ts`** — path-form шим, реэкспортит 7 subpath-only
  компонентов (FieldLabel, FieldRow, ImagePreview, Indicator, Info, LabelValue, Panel), которых нет в главном входе
  `dist/index.js`. Без него они (а) не на `window.MoyskladUikit` для рендера и (б) не распознаются как
  компоненты (гейт экспортов сканит `export { X } from` в path-form, а bare-спецификатор
  `@moysklad/uikit/components/X` он не резолвит — там нет директории `node_modules/.../components/X`).
  ⚠️ Путь `../../../` package-relative от PKG_DIR (`node_modules/@moysklad/uikit`) — завязан на глубину scope.
- **tokensPkg/tokensGlob** → копирует `dist/colorVariables.css` в `tokens/`, и `styles.css` его @import-ит.
  Без этого `[TOKENS_MISSING]`: семантические токены (`--text-*`, `--bgd-*` и т.д.) не определены в выгрузке
  и компоненты были бы без фирменных цветов. Токены под `@layer lognex → theme → {basic, ms, status}`.
- **titleMap (null)** — гасит [TITLE_UNMAPPED] для не-компонентных страниц: Цвета, Типографика, Иконки,
  DataGrid(таблица), Карточкатовара, Списоктоваров (ключи — с убранными пробелами).
- **overrides.EmptyStateLarge.cardMode: "column"** — история шире ячейки сетки ([GRID_OVERFLOW]).
- **overrides.Layout.cardMode: "column"** (31.20.0) — все истории Layout — макеты страницы шире ячейки сетки ([GRID_OVERFLOW] wide). Presentation-only, оценки не сбрасывает.
- **Ключ `previousProjectId` из config.json убран** (31.20.0): конвертер падает на неизвестных ключах (`[CONFIG] unknown key`). Id старого проекта — ниже, в «Состояние выгрузки».
- **readmeHeader: .design-sync/conventions.md** — conventions-заголовок (идиома токенов, провайдеры, шрифт).

## Re-sync risks / на что смотреть
- **[FONT_MISSING] «ALS Hauss»** — ПРИНЯТО. Шрифт проприетарный, в пакете нет woff2. Референс и превью
  оба рендерят системным фолбэком → сверка корректна. Реальный шрифт указан в conventions.md для дизайн-агента.
- **Оверлеи (Modal/Sidepage/BottomSheet/Dropdown/Tooltip/Hint/Help/Snackbar/OverlayActions/Datepicker/
  Select/Multiselect/AutoComplete)** [GENERAL]: каждая «Обзор»-история открывает оверлей ТОЛЬКО по
  интеракции (useState по onClick, либо hover/portal). На момент capture оверлей ЗАКРЫТ → и превью, и
  storybook показывают триггер/закрытый контрол → НИ ОДИН не требует `cfg.overrides.<Name>.cardMode:"single"`.
  Грейдятся как match по триггеру (прецедент Modal). ⚠️ Если в будущем появится история с initial open=true —
  ТОТ компонент потребует `cardMode:"single"`. Усиление (всегда-открытая история + single) опционально.
- **Картинки через `data:image/svg+xml`** [GENERAL]: истории EmptyState/EmptyStateLarge/ImagePreview/
  FileUploader/Carousel строят изображения inline data-URI, НЕ удалёнными URL → нет риска `[ASSETS_BLOCKED]`.
  Однотонный цветной прямоугольник на ОБЕИХ панелях — это и есть нужный SVG, не битый ассет. Канарейка
  `[ASSETS_BLOCKED]` — только одинаково-битая картинка по http(s)-src.
- **DataGrid** (`@moysklad/uikit/data-grid`) НЕ закартирован — отдельный модуль, не на главном глобале,
  требует @tanstack/react-table + LocaleContextProvider. Демо осталось как локальная история (titleMap null).
- **306 иконок** и токен-страницы (Цвета/Иконки) не имеют карточек (нет экспорта-компонента на каждую).
  Иконки доступны как `@moysklad/uikit/icon`; в бандл главного глобала не входят.
- **Textfield 31.20.0 без `value` рисует строку «undefined»** [GENERAL для историй]: неуправляемый Textfield
  показывает литерал. Ошибки консоли нет, `check-stories` и tsc молчат — поймала только сверка снимков.
  В историях Textfield всегда `value` + `onChange`; правило записано и в conventions.md для дизайн-агента.
- **Версия браузера Playwright** [GENERAL]: `.ds-sync` ставит свой `playwright` (1.61 → chromium-headless-shell
  сборки 1228), проект — более новый `playwright-core`. Установка новой сборки может убрать старую из
  `~/.cache/ms-playwright`; тогда валидатор пишет `[RENDER_SKIPPED] Executable doesn't exist`. Лечение:
  `cd .ds-sync && npx playwright install chromium-headless-shell`. Не запускать с `--no-render-check`.
- **Снимки превью в сверке — окно 900x700**: у длинных историй нижние секции превью за кадром, оценка по
  видимой части (код у секций общий). Заголовки секций Showcase в превью идут шрифтом с засечками — у превью
  нет body-шрифта из `.storybook/preview.css`; это обвязка витрины, не компонент, было так и на 28.x.
- **Проверка в браузере под учёткой**: браузер агента (`agent-browser`) не залогинен в claude.ai, вход упирается
  в Cloudflare и логин — визуальную проверку галереи делает владелец или вход в профиль `uikit` руками.
- Репозиторий — git (ветка `main`, push = деплой витрины). Durable-состояние design-sync — `.design-sync/`
  (config.json, NOTES.md, conventions.md, extra-exports.ts); оценки `.cache/compare/*.grade.json` — только на этой машине.

## Состояние грейдинга (2026-10-12, 31.20.0)
- **68/68 компонентов `match`.** Вердикты в `.design-sync/.cache/compare/<Name>.grade.json`.
- 30 компонентов (18 с изменёнными историями + 12 новых) сняты заново и оценены по снимкам (все истории на листах просмотрены); у Textfield после первого прогона найдена «undefined», история исправлена и переснята.
- 38 компонентов перенесены с оценкой 28.x (истории не менялись). После мажорного апдейта выборочно перепроверены глазами: Badge, Modal, Tabs, Checkbox, Text, EmptyStateLarge, Banner, LabelValueDate, LabelValueTextfield — совпадают.
- Validate: render check 68/68, bad/thin 0; единственное предупреждение — принятый `[FONT_MISSING]`.

## Состояние выгрузки (2026-10-12, 31.20.0)
- **АКТИВНЫЙ проект: `60c8aa90-acf4-42c8-a017-03288eda7056`** (в интерфейсе — «MoySklad UI Kit»), запинен в config.json. URL: https://claude.ai/design/p/60c8aa90-acf4-42c8-a017-03288eda7056
- Atomic re-sync по якорю: залиты все файлы бандла (68 × .d.ts/.html/.jsx/.prompt.md, 68 `_preview/*.js`, бандл, стили, токены, `_vendor/`, README), удалён `Label` (5 файлов), sentinel перевзведён, `_ds_sync.json` — последним. `list_files` подтвердил 68 папок компонентов, `Label` нет.
- App-генерируемые `_adherence.oxlintrc.json` и `_ds_manifest.json` — не наши, не трогаем.
- Published (чекбокс) не трогали — снят.
- Старый проект `b8937eea-acb1-4ab3-aa64-9e7e589c2d9d` («Design System», застрял в онбординг-мастере) удаляется только в интерфейсе; удалён ли — неизвестно.

### История: почему проект 60c8aa90, а не b8937eea (2026-06-25)
- Первый проект b8937eea был начат в интерфейсе и застрял в режиме «generate a design system» (онбординг-мастер). Загрузка через API режим не переключает, переключателя в API нет.
- Лечится только свежим `DesignSync(create_project)` — API-созданный проект сразу открывается в режиме галереи.
- **Правило: целевой проект всегда создавать через `create_project`**, не переиспользовать созданный в интерфейсе.
