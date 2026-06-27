# HANDOFF — витрина дизайн-системы на @moysklad/uikit

Контекст для продолжения работы. Обновлять при значимых изменениях.

---

## ✅ ЭКСПОРТ В CLAUDE DESIGN — ЗАВЕРШЁН (2026-06-25)

Выгрузка витрины в Claude Design **полностью завершена**. Повторно выгружать ничего не нужно.
Полные технические заметки: **`.design-sync/NOTES.md`** (читать первым).

**Активный проект Claude Design:** `60c8aa90-acf4-42c8-a017-03288eda7056` («moysklad uikit»),
запинен в `.design-sync/config.json`.
URL: <https://claude.ai/design/p/60c8aa90-acf4-42c8-a017-03288eda7056>

**Итог (2026-06-25):**
- Витрина переделана из тематической в **покомпонентную**: `src/stories/catalog/<Name>.stories.tsx`,
  по одной истории на компонент, `title: 'Компоненты/<Group>/<Name>'`. Старые `src/stories/components/*`
  удалены; tokens/Introduction/demos оставлены.
- Конвертер собирает **57 компонентов**, валидатор чист (единственное предупреждение — принятый
  `[FONT_MISSING]` ALS Hauss). Конфиг: `.design-sync/config.json`, conventions-заголовок: `.design-sync/conventions.md`.
- **Все 57 компонентов оценены `match`** (вердикты в `.design-sync/.cache/compare/<Name>.grade.json`);
  ни одного mismatch/close/blocked, ни одного owned-превью не понадобилось.
- **Выгружено полностью**: все 57 компонентов (× `.d.ts/.html/.jsx/.prompt.md`) + 57 `_preview/*.js`,
  бандл, `styles.css`, `tokens/`, `_vendor/`, README. `_ds_sync.json` залит последним → проект **ANCHORED**.
- Подтверждено визуально в браузере: галерея компонентов и README рендерятся, app построил `_ds_manifest.json`.

**⚠️ На будущее (важно при повторных запусках `/design-sync`):**
- Целевой проект **всегда создавать через `create_project`**, НЕ переиспользовать существующий/созданный-в-UI:
  первый проект `b8937eea-acb1-4ab3-aa64-9e7e589c2d9d` («Design System») застрял в режиме онбординг-мастера
  «generate a design system» — загрузка файлов через API его НЕ переключает в режим галереи, переключателя в API нет.
  Поэтому работу перенесли в свежесозданный `60c8aa90…`. Старый помечен на удаление (в API нет delete_project →
  удалять в UI); `previousProjectId` в `config.json`.
- Чекбокс **Published** в проекте (снят) — публикует ДС для новых проектов команды; включать по решению пользователя.

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

## Факты о пакете

- `@moysklad/uikit` **v28.1.0**, peer: react 17/18. Установлен react 18.3.1.
- Токены: `import '@moysklad/uikit/colorVariables.css'` (подключён один раз в `.storybook/preview.ts`).
  - CSS `@layer lognex` → подслои `basic` (палитра), `ms` (семантика: `--text-*`, `--bgd-*`, `--button-*`, `--border-*`, `--elements-*`, `--badge-*`), `status` (`--status-*`).
- **306 иконок**: `import { Check20Icon } from '@moysklad/uikit/icon'`. Размеры 12/16/20px. Пропы: `{ stroke?, width?, height?, className? }`. Имена вида `Name{12|16|20}Icon`.
- Типографика: `Text` с `variant` (body, bodyL, bodyStrong, bodyXL, caption, heading1..4) + шорткаты `Text.H1..H4/Body/Caption`. Цвета: `TextColor` (primary, secondary, tertiary, accent, positive, critical, attention, invert).

## ⚠️ Гочи (важно!)

### Компоненты НЕ в главном входе — только через подпути
Реэкспортируются из `@moysklad/uikit/components/<Name>`, а НЕ из `@moysklad/uikit`:
```tsx
import { FieldRow } from '@moysklad/uikit/components/FieldRow';
import { Label } from '@moysklad/uikit/components/Label';
import { LabelValue } from '@moysklad/uikit/components/LabelValue';
import { Info } from '@moysklad/uikit/components/Info';
import { Indicator } from '@moysklad/uikit/components/Indicator';
import { ImagePreview } from '@moysklad/uikit/components/ImagePreview';
import { InputClear } from '@moysklad/uikit/components/InputClear';
```
Проверять наличие в главном входе: `node_modules/@moysklad/uikit/dist/index.d.ts`.
Все подпути есть в `package.json` → `exports`.

### API-нюансы конкретных компонентов
- **Button**: `variant` (primary/accent/additional/frameless/secondary/filled), `size` (m/l/xl), `isIconButton`, `isLoading`, `stretch`.
- **Chip**: union из legacy (`isActive`/`onClick`/`children`) и new API. Использовать **new**: `label`, `selected`, `onSelectedChange`, `variant` (regular/warning/critical), `clearable`/`onClear`.
- **Switch**: `@deprecated` → использовать `SegmentButton`.
- **Header**: `@deprecated` → использовать `Text`/`Text.H1..`.
- **Select**: `value?: ISelectOption<T>` (опция целиком, не raw), `onChange(option)`, `options`.
- **Checkbox/Radiobutton**: `onChange(e)` где `e.target` кастуется к `HTMLInputElement`.
- **Tabs**: compound `Tabs` + `Tabs.Item` (value/onChange).
- **SegmentButton**: `SegmentButton.Group` (value/onChange) + `SegmentButton` (value).
- **Breadcrumbs**: compound `Breadcrumbs` + `Breadcrumbs.Item` (НЕ проп `items`).
- **Modal**: `isVisible`/`onClose` + `Modal.Header/Body/Footer`.
- **Sidepage**: `isOpen`/`onClose` + отдельные экспорты `SidepageHeader/Content/Footer`.
- **Dropdown**: требует `triggerRef: RefObject<HTMLElement>`, `open`, `onClose(reason?)`. `DropdownDivider` отдельно.
- **Snackbar**: провайдер `<Snackbar>` оборачивает дерево; внутри `useSnackbar().showSnackbar({ message })`.
- **OverlayActions**: `actions: [{ id, title, icon: ComponentType, onClick }]`, оборачивает children.
- **Tooltip**: ОБЯЗАТЕЛЬНЫ `placement` и `offset: [number, number]`. `Placement` enum.
- **Hint**: `variant` (standard/alert), `placement`, `overlay`.
- **Datepicker**: ОБЯЗАТЕЛЬНЫ `lang` (`ELanguages.RU`), `localeFormat`, `selectedDate`, `onDateChanged(date, options)`.
  - ⚠️ `localeFormat` — это **локаль для `Intl.DateTimeFormat`** (BCP-47 тег, напр. `'ru-RU'` = `ELanguages.RU`), а НЕ паттерн формата! Тип `TLocaleFormat = string` вводит в заблуждение. Передача `'dd.MM.yyyy'` → рантайм `RangeError: Invalid language tag`. Формат вывода задаётся через `dateTimeFormatOptions: Intl.DateTimeFormatOptions`.
- **Quantity**: `value: number`, `onChange(e|null, value)`.
- **InputUnit**: `value: number`, `onChangeValue`, `unitOptions/selectedUnitOption/onUnitChange` (ISelectOption).
- **Multiselect**: `<Multiselect<T>>` с `items: {value,label}[]`, `values: T[]`, `onChange(values)`, `getOtherText(n)`.
- **AutoComplete**: `renderInput` ОБЯЗАТЕЛЕН; его `onChange` вызывается **без аргументов** (`onChange?.()`). `options` = массив или `null`. ⚠️ `ref` из `renderInput` ОБЯЗАТЕЛЬНО привязать к input — это якорь дропдауна (floating-ui `autoUpdate`). Без него рантайм-краш `Cannot read properties of null (reading 'getBoundingClientRect')`. Дженерик `R` не выводится → привести `ref as Ref<HTMLInputElement>`.
- **BottomSheet**: ⚠️ ТРЕБУЕТ обёртку `<BottomSheetContextProvider>` — порталится в `root` из контекста; без провайдера `root === null` и шторка **молча не открывается** (без ошибки). Провайдер есть в главном входе.
- **MentionsTextfield**: `value: TMentionValue` (`{raw, backend, mentionsMap}`), `items`, `trigger="@"`, `onChange(value)`.
- **FileUploader**: хук `useFileUploader()` → `{ files, invalidFiles, loadingFiles, removeFile, ... }`. Компоненты `FileUploader.Trigger {...uploader}` (dropzone) и `FileUploader` (`files`, `onDeleteFile`).
- **EmptyState**: `imageSlot` (`EmptyState.Image source/alt`), `actionsSlot` (`EmptyState.Actions` + `EmptyState.Button` = UIKit Button).
- **EmptyStateLarge**: своя `EmptyStateLarge.Button` с `variant` `'blue'|'green'` (НЕ UIKit Button!), `.Actions` (left/rightButtonSlot), `.Links`/`.Link`, `.Image`.
- **Indicator**: `indicator: { mode: 'count'|'countDot'|'noveltyDot'|'noveltyNumber', count? }`.
- **VerticalTab**: `VerticalTabGroup` (value/onChange) + `VerticalTab` (title/value/icon/counter/titleDot/isDisabled).
- **SideMenu**: `items: {id,label}[]`, `selectedId`, `onSelect`.
- **HStack/VStack**: `size` = `s0..s40` (шаг 4px × коэффициент), полиморфные (`as`).
- **Listing**: `current/total/onPrev/onNext`, `isPrevDisabled/isNextDisabled`.
- **Carousel**: `sources: string[]`, `isVisible`, `onClose` (полноэкранный вьюер).

## Структура витрины

```
.storybook/main.ts | preview.ts | preview.css   # конфиг, подключение токенов, storySort
src/shared/Showcase.tsx                          # хелперы Row/Col/Section (НЕ часть uikit)
src/stories/
  Introduction.mdx
  tokens/    Colors | Typography | Icons (.stories.tsx)   # Icons — динамич. галерея из icon/*
  catalog/   <Name>.stories.tsx (57 шт.)                  # ПОКОМПОНЕНТНЫЕ истории (title: Компоненты/<Group>/<Name>)
  demos/     ProductCard | ProductList | DataGridTable (.stories.tsx)   # демо-сборки экранов
```

⚠️ Старые тематические истории (`src/stories/components/*`) **удалены** при переходе на покомпонентный
каталог для design-sync (см. раздел вверху + `.design-sync/NOTES.md`). Их рабочие примеры использования
перенесены в `catalog/`.

## Состояние

**Покрыто** (~весь публичный API, 75+ компонентов): все из README, кроме перечисленного ниже.

**НЕ покрыто / осознанно пропущено:**
- Switch (deprecated), InputClear (внутренний), BodyText/BodyL/BodyXL/Caption/H1-H4 (алиасы Text-вариантов — показаны на странице типографики).
- В DataGrid показан базовый сценарий (см. ниже); НЕ показаны: фильтры в шапке (`HeaderBuilder`, `Filters`, `SavedFilters`), `ColumnSettings`, `TablePanel`/`TableActions`, DnD-сортировка строк, итоги (footer totals), inline-редактирование ячеек (`InputCell`/`SelectCell`/`NumberInputCell`).

## DataGrid (`@moysklad/uikit/data-grid`)

Построен на **@tanstack/react-table 8.21.3** (зафиксирован в `dependencies` точной версией — нужен ЕДИНЫЙ инстанс с uikit, иначе React-контекст таблицы не совпадёт).

- Демо: `src/stories/demos/DataGridTable.stories.tsx` («Демо-сборки/DataGrid»).
- Паттерн: `useReactTable({...})` → `<Table table={...} isLoading pagination={...} />`.
- Готовые ячейки: `NameCell`, `TextCell` (требует `isArchived`/`isDisabled`), `CheckboxCell` (`{row, table}`), `LinkCell`, `DateCell`, `BooleanCell`, `InputCell`, `SelectCell`, `ImageCell` и др. (`data-grid/cells`).
- Готовые заголовки: `CheckboxHeader` (`{table, column}`), `TextHeader`, `NumberHeader`, `DateHeader`, `LinkHeader`, `HeaderBuilder` + фильтр-компоненты (`data-grid/headers`).
- `Pagination` из data-grid: `{ total, pageSize, startItemIndex, isDisabled, onPaginationChange(start, perPage) }`.
- Обернуть в `LocaleContextProvider lang/locale={ELanguages.RU}` (локаль для ячеек/пагинации).
- ⚠️ Гочи TS: `Table` дженерик `<T extends WithRowClickLink>` инвариантен в TSX → вывод падает в ограничение. Фикс: (1) тип строки ДОЛЖЕН иметь общее свойство с `WithRowClickLink` — добавить `onRowClick?: () => void` (иначе weak-type TS2559); (2) фиксировать дженерик instantiation-выражением: `const ProductTable = Table<Product>;` и рендерить `<ProductTable .../>`.
- ⚠️ Контейнер таблицы: задавать высоту обёртке (демо — `height: 420`); Table сам считает высоту (ResizeObserver). Это самый runtime-чувствительный компонент — стоит открыть в браузере и проверить визуально.

## Верификация

- `npx tsc --noEmit` — без ошибок.
- `npm run build-storybook` — успешная сборка (EXIT 0). Предупреждения `"use client"` из framer-motion — безвредны.
- ✅ **Рантайм-прогон в браузере сделан**: все 68 историй рендерятся без ошибок (проверка через скрытый iframe — класс `sb-show-errordisplay` + слушатели `error`/`unhandledrejection`); открываемые оверлеи (Modal, Sidepage, BottomSheet, Dropdown, Carousel) проверены в открытом состоянии.
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
