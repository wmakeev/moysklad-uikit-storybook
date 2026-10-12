# CLAUDE.md

Гайд для агента по этому репозиторию. Сначала прочитай источники истины ниже —
этот файл лишь навигация и самые частые грабли.

## Что это за репозиторий

**Витрина (Storybook) дизайн-системы `@moysklad/uikit`** — НЕ исходники пакета.
Реальные компоненты лежат готовыми в `node_modules/@moysklad/uikit/dist`; репозиторий
показывает их живьём и служит источником для выгрузки в **Claude Design**
(claude.ai/design). Это git-репозиторий (ветка `main`; push в `main` запускает деплой на GitHub Pages — только по просьбе владельца). Durable-состояние живёт в файлах
(`.design-sync/`, `HANDOFF.md`, планы работ в `.agents/plans/`).

Две цели: (1) «потрогать» компоненты и демо-сборки экранов; (2) отдать артефакт
(HTML-превью + токены, не React-код) в Claude Design.

## Источники истины (читать ПЕРВЫМ, в этом порядке)

- **`HANDOFF.md`** — контекст продолжения: цель, статус, методология добавления, ловушки окружения. Обновлять при значимых изменениях.
- **`.agents/plans/`** — планы работ (нумерованные папки). План перехода на 31.20.0 — `.agents/plans/001-uikit-31/` (контекст, план, `api-changes.md` — сводка изменений API 28.x → 31.20.0, журнал прогона в `run/`).
- **`.design-sync/NOTES.md`** — всё про экспорт в Claude Design: конвертер,
  валидатор, решения в `config.json` и ПОЧЕМУ, состояние грейдинга и выгрузки.
- **`skills/moysklad-uikit/`** — навык о самом пакете: API-нюансы компонентов, провайдеры, data-grid, каркас продакшн-приложения (бывший `stack.md`). Подключён симлинком `~/.claude/skills/moysklad-uikit`. Новое знание о пакете — туда.

## Стек и команды

- Storybook 8.6 + Vite 5 + React 18.3 + TypeScript 5.6. Node 24, npm 11. ESM-only.
- `@moysklad/uikit` **v31.20.0** (68 компонентов в каталоге); `@tanstack/react-table` зафиксирован **точной**
  версией `8.21.3` (нужен единый инстанс с uikit для `data-grid`).
- `npm run storybook` — dev-сервер на `localhost:6006`.
- `npm run build-storybook` — статическая сборка в `storybook-static/`.
- `npm run check-stories` — рантайм-проверка историй в браузере (`scripts/check-stories.mjs`; флаги `--dir <папка сборки>`, `--ids`, `--interact <id>:<селектор>`). `tsc` и сборка рантайм-падений не ловят, скрипт ловит.
- `npx tsc --noEmit` — типпроверка (источник истины; LSP-диагностика бывает устаревшей).

## Структура витрины

```
.storybook/         main.ts | preview.ts | preview.css   # конфиг, токены, storySort
src/shared/         Showcase.tsx                          # хелперы Row/Col/Section (НЕ uikit)
src/stories/
  Introduction.mdx
  tokens/    Colors | Typography | Icons (.stories.tsx)   # Icons — динамич. галерея
  catalog/   <Name>.stories.tsx (68 шт.)                  # ПОКОМПОНЕНТНЫЕ истории
  demos/     ProductCard | ProductList | DataGridTable    # демо-сборки экранов
.design-sync/       config.json | NOTES.md | conventions.md | extra-exports.ts | .cache/
ds-bundle/          собранный артефакт для выгрузки
```

Истории — покомпонентные: один компонент = одна история, `title: 'Компоненты/<Group>/<Name>'`.
Группа в title **должна быть латиницей** (кириллица → слаг `misc`). Старые тематические
истории (`src/stories/components/*`) удалены.

## Статус

- **Витрина** переведена на `@moysklad/uikit` 31.20.0: 68 историй (57 прежних − `Label` (компонент `@deprecated`) + 12 новых). План — `.agents/plans/001-uikit-31/`.
- **Экспорт в Claude Design актуален (31.20.0, 2026-10-12):** 68 компонентов выгружены в проект `60c8aa90-acf4-42c8-a017-03288eda7056` (запинен в `.design-sync/config.json`), проект ANCHORED. Состояние и риски re-sync — `.design-sync/NOTES.md`.

## Ключевые грабли (полный список — в навыке `skills/moysklad-uikit/`)

1. **API читать из `dist`, не угадывать**: `node_modules/@moysklad/uikit/dist/components/<Name>/<Name>.d.ts`
   (пропсы часто в `<Name>.types.d.ts`). Имена иконок не угадывать — сверять по
   `dist/icon/components/` (напр. `Info16Icon` не существует → `InformationCircle16Icon`).
2. **Не всё в главном входе**: девять компонентов только через подпуть
   `@moysklad/uikit/components/<Name>` (FieldLabel, FieldRow, ImagePreview, Indicator, Info,
   InputClear, Label, LabelValue, Panel). Остальное — из главного входа, включая `DateRange`;
   главный вход также реэкспортирует hooks, icon, utils. Проверка — `dist/index.d.ts`.
3. **Провайдеры, без которых компонент молча не работает**: `Snackbar`,
   `BottomSheetContextProvider`, `LocaleContextProvider` (для data-grid).
4. **`tsc`/`build` НЕ ловят рантайм-падения** (неверный проп, нет провайдера/якоря).
   После интерактивных компонентов (оверлеи, Datepicker, AutoComplete, DataGrid) —
   **обязателен браузерный прогон**. Метод быстрой сверки — в HANDOFF.md «Верификация».
5. **Deprecated → канон**: `Switch`→`SegmentButton`, `Header`→`Text`, `Typography`→`Text`, `Label`→`FieldLabel`.
6. Почти всё **controlled** (через `useState`). Точечные ловушки (Datepicker `localeFormat`
   = BCP-47-локаль, AutoComplete `ref`, Tooltip `placement`+`offset`, weak-type дженерики
   в TSX) — подробно в `skills/moysklad-uikit/references/components.md`.

## Цикл добавления компонента

1. Прочитать API из `dist/*.d.ts`. 2. Проверить главный вход / подпуть.
3. Написать story с `useState`, оформление через `src/shared/Showcase.tsx`,
   `title: 'Компоненты/<Group(латиница)>/<Name>'`. 4. `npx tsc --noEmit` →
   `npm run build-storybook` → `npm run check-stories` (браузерный прогон).

## Экспорт в Claude Design (если нужен re-sync)

Через инструмент `DesignSync` + скилл `/design-sync`. ⚠️ Целевой проект **всегда
создавать через `create_project`** — переиспользование UI-созданного застревает в
онбординг-мастере. Команды конвертера/валидатора/драйвера — в `.design-sync/NOTES.md`.
