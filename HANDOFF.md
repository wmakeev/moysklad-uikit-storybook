# HANDOFF — витрина дизайн-системы на @moysklad/uikit

Контекст для продолжения работы. Обновлять при значимых изменениях.

---

## Текущее состояние (2026-10-12): витрина и выгрузка на 31.20.0

- Витрина переведена на `@moysklad/uikit` **31.20.0** по плану `.agents/plans/001-uikit-31/`. Карта прогона, решения и грабли: `.agents/plans/001-uikit-31/run/README.md`. Сводка изменений API 28.1.0 → 31.20.0: `.agents/plans/001-uikit-31/api-changes.md`.
- В каталоге **68 компонентов** (57 − `Label` + 12 новых). `Label` в 31.20.0 целиком `@deprecated` и убран, как раньше `Switch`; канон — `FieldLabel`.
- Рантайм-проверка всех историй — `npm run check-stories` (`scripts/check-stories.mjs`, playwright-core + системный Chrome; флаги `--dir`, `--ids`, `--interact <id>:<селектор>`). Код выхода падает только на исключение или экран ошибки; колонку «ошибки консоли» смотреть глазами. `--interact` только кликает. Видимый мусор вроде строки «undefined» в поле скрипт не ловит — его поймала только сверка в design-sync.
- Витрина опубликована на GitHub Pages (push в `main`): <https://wmakeev.github.io/moysklad-uikit-storybook/>.

## ЭКСПОРТ В CLAUDE DESIGN (2026-10-12, на 31.20.0)

Полные технические заметки: **`.design-sync/NOTES.md`** (читать первым).

**Активный проект Claude Design:** `60c8aa90-acf4-42c8-a017-03288eda7056` (в интерфейсе сейчас называется «MoySklad UI Kit»), запинен в `.design-sync/config.json`. URL: <https://claude.ai/design/p/60c8aa90-acf4-42c8-a017-03288eda7056>

- Перевыгружено на 31.20.0: 68 компонентов, `Label` из проекта удалён, `_ds_sync.json` залит последним — проект снова ANCHORED, следующий re-sync пойдёт по диффу.
- Все 68 карточек рендерятся (render check 68/68). 30 изменившихся и новых оценены `match` по снимкам; 38 прежних перенесены с оценкой 28.x, из них 9 выборочно перепроверены глазами — совпадают.
- Чекбокс **Published** в проекте не трогали (снят) — включать по решению владельца.
- Целевой проект всегда создавать через `create_project`, не переиспользовать созданный в интерфейсе: такой застревает в онбординг-мастере (история — в NOTES). Старый `b8937eea-acb1-4ab3-aa64-9e7e589c2d9d` удаляется только руками в интерфейсе.

---

## Цель проекта

Построить **визуальную витрину** компонентов `@moysklad/uikit`, чтобы:
1. «потрогать» компоненты живьём и увидеть сборки экранов;
2. позже отдать артефакт в **Claude Design** (claude.ai/design) для проектирования на основе этой системы.

Витрина — это ещё и **источник для Claude Design**: туда уходят HTML-превью + токены, не React-код.

## Стек и запуск

- **Storybook 8.6 + Vite 5 + React 18.3 + TypeScript 5.6** (выбран как стандарт для дизайн-систем).
- Проект изначально был пустой (только установлен пакет). Настроено вручную.
- Команды:
  - `npm run storybook` — dev-сервер на `localhost:6006`
  - `npm run build-storybook` — статическая сборка в `storybook-static/`
- Node 24, npm 11.

## Знания о пакете — в навыке `moysklad-uikit`

API-нюансы компонентов, подпути, провайдеры, токены, иконки, data-grid и каркас приложения живут в навыке `skills/moysklad-uikit/` этого репозитория (подключён в `~/.claude/skills/moysklad-uikit` симлинком). Это единственный источник: новое о пакете, найденное при работе с витриной, записывать туда, а не сюда.

- `SKILL.md` — порядок работы и самые частые ловушки;
- `references/components.md` — нюансы API по каждому компоненту;
- `references/data-grid.md` — таблицы;
- `references/setup.md` — стек и каркас нового приложения (бывший `stack.md`).

## Структура витрины

```
.storybook/main.ts | preview.ts | preview.css   # конфиг, подключение токенов, storySort
src/shared/Showcase.tsx                          # хелперы Row/Col/Section (НЕ часть uikit)
src/stories/
  Introduction.mdx
  tokens/    Colors | Typography | Icons (.stories.tsx)   # Icons — динамич. галерея из icon/*
  catalog/   <Name>.stories.tsx (68 шт.)                  # ПОКОМПОНЕНТНЫЕ истории (title: Компоненты/<Group>/<Name>)
  demos/     ProductCard | ProductList | DataGridTable (.stories.tsx)   # демо-сборки экранов
```

⚠️ Старые тематические истории (`src/stories/components/*`) **удалены** при переходе на покомпонентный
каталог для design-sync (см. раздел вверху + `.design-sync/NOTES.md`). Их рабочие примеры использования
перенесены в `catalog/`.

## Состояние

**Покрыто** (~весь публичный API, 75+ компонентов): все из README, кроме перечисленного ниже.

**НЕ покрыто / осознанно пропущено:**
- Switch и Label (deprecated), InputClear (внутренний), BodyText/BodyL/BodyXL/Caption/H1-H4 (алиасы Text-вариантов — показаны на странице типографики).
- В DataGrid показан базовый сценарий (см. ниже); НЕ показаны: фильтры в шапке (`HeaderBuilder`, `Filters`, `SavedFilters`), `ColumnSettings`, `TablePanel`/`TableActions`, DnD-сортировка строк, итоги (footer totals), inline-редактирование ячеек (`InputCell`/`SelectCell`/`NumberInputCell`).

## DataGrid (`@moysklad/uikit/data-grid`)

- Демо: `src/stories/demos/DataGridTable.stories.tsx` («Демо-сборки/DataGrid»), базовый сценарий: выбор строк, ячейки, пагинация. API и ловушки — `skills/moysklad-uikit/references/data-grid.md`.
- `@tanstack/react-table` зафиксирован в `dependencies` точной версией `8.21.3`.

## Верификация

- `npx tsc --noEmit` — без ошибок.
- `npm run build-storybook` — успешная сборка (EXIT 0). Предупреждения `"use client"` из framer-motion — безвредны.
- ✅ **Рантайм-прогон**: на 31.20.0 — `npm run check-stories` (см. «Текущее состояние»). Исторически (28.1.0): все 68 историй рендерятся без ошибок (проверка через скрытый iframe — класс `sb-show-errordisplay` + слушатели `error`/`unhandledrejection`); открываемые оверлеи (Modal, Sidepage, BottomSheet, Dropdown, Carousel) проверены в открытом состоянии.
  - Метод сверки рантайма (быстрый): загрузить dev-сервер, в любой странице создать скрытый `<iframe>` (тот же origin), в цикле менять `src='/iframe.html?id=<id>&viewMode=story'`, после load+~450мс читать `iframe.contentDocument.body.classList.contains('sb-show-errordisplay')` и `#error-message`. Так весь набор проверяется одним JS-вызовом.
  - ⚠️ Урок: `tsc` + `build` НЕ ловят рантайм-падения (неверное значение пропа, отсутствующий провайдер/якорь). Так пропустили баги Datepicker `localeFormat`, AutoComplete `ref`, BottomSheet-провайдер. После добавления интерактивных компонентов — гонять браузерный прогон.
- `tsconfig.json`: `moduleResolution: bundler`, `jsx: react-jsx`, `strict: true`.

## Следующие шаги (на выбор пользователя)

1. ✅ ~~Добавить DataGrid~~ — сделано (базовый сценарий).
2. Расширенное DataGrid-демо: фильтры в шапке (`HeaderBuilder`), `ColumnSettings`, inline-редактирование.
3. **Экспорт в Claude Design** через инструмент `DesignSync` + скилл `/design-sync`:
   - артефакт = preview-HTML-карточки с маркером `<!-- @dsCard group="..." -->` + токены;
   - группировать по тем же категориям, что в витрине;
   - токены уже структурированы в `colorVariables.css`.
   - Порядок: `list_projects`/`create_project` → собрать локальный бандл превью → `finalize_plan` → `write_files`.
   - ⚠️ Компоненты — React (порталы, framer-motion, ResizeObserver). Для карточек нужен РЕНДЕР в HTML (SSR/скриншоты), просто скопировать JSX нельзя.

## Методология добавления компонентов (проверенный цикл)

1. **Читать API из `dist`**, а не угадывать:
   - компонент: `node_modules/@moysklad/uikit/dist/components/<Name>/<Name>.d.ts`;
   - ⚠️ пропсы часто вынесены в `<Name>.types.d.ts` (Checkbox, Radiobutton, Toggle, Chip) — `<Name>.d.ts` лишь реэкспортирует;
   - константы-енумы: `dist/components/<Name>/consts/*` или внутри `<Name>.d.ts`;
   - иконки: `dist/icon/components/`; токены: `dist/colorVariables.css`; локали/язык: `dist/context/`.
2. **Проверить, экспортируется ли из главного входа** (`dist/index.d.ts`). Если нет — импорт через подпуть `@moysklad/uikit/components/<Name>` (см. список выше).
3. Писать story с `useState` (почти всё — controlled), оформление через `src/shared/Showcase.tsx`.
4. `npx tsc --noEmit` после каждой пачки → чинить → `npm run build-storybook` в конце.

## Неочевидные ловушки окружения (опыт сессии)

- **`require('@moysklad/uikit/package.json')` падает** с `ERR_PACKAGE_PATH_NOT_EXPORTED` (нет `./package.json` в `exports`). Чтобы прочитать exports-мапу: `cd node_modules/@moysklad/uikit && node -e "console.log(require('./package.json').exports)"` (из каталога пакета) либо читать файл напрямую.
- **Имена иконок НЕ угадываются** — проверять по `dist/icon/components/`. Пример: `Info16Icon` НЕ существует → `InformationCircle16Icon`. (Существуют `Edit/Delete/Copy/Customers/Archive{16}Icon`.) Самый быстрый способ обзора — динамическая галерея в `tokens/Icons.stories.tsx` (`import * as Icons`).
- **IDE-диагностика (LSP) иногда расходится с `tsc`** и показывает устаревшие ошибки. Источник истины — `npx tsc --noEmit`.
- **`Text variant={...}`**: при переборе массива со строковым типом (`string`) нужен `@ts-expect-error`; а `color={...}` из `Object.values(TextColor)` сохраняет union — подавление НЕ нужно (и будет помечено как unused directive).
- **Активы без внешних файлов**: для `EmptyState`/`EmptyStateLarge`/`Carousel`/`ImagePreview` использованы inline-SVG через `data:image/svg+xml;utf8,` + `encodeURIComponent` — не тянуть картинки в репозиторий.
- **Controlled by design**: `Toggle.onChange` обязателен (нет uncontrolled-режима); `Checkbox.onChange` даёт `e` с `e.target as HTMLInputElement`.
- **Deprecated → рантайм-предупреждения в консоли**: `Switch`, `Header`, `Typography`. В витрине заменены каноничными аналогами.
- **Общий паттерн weak-type + инвариантность** (не только DataGrid): если дженерик uikit ограничен «слабым» типом (только опциональные поля, как `WithRowClickLink`), то (1) тип-аргумент должен иметь хотя бы одно общее поле (иначе `TS2559`), и (2) в TSX вывод дженерика падает в ограничение — фиксировать через instantiation-выражение `const X = Comp<T>;`.
