# Таблицы: @moysklad/uikit/data-grid

Сверено с 31.20.0. Самый чувствительный к рантайму модуль: готово, когда таблица открыта в браузере, строки видны, консоль чиста.

## Обязательная обвязка

- **`@tanstack/react-table` ровно `8.21.3`**, без `^` — единый инстанс с uikit, иначе контекст таблицы не совпадёт и таблица не отрисуется.
- **`LocaleContextProvider lang={ELanguages.RU} locale={ELanguages.RU}`** вокруг таблицы — локаль ячеек и пагинации.
- **Высота контейнера задаётся явно** (`<div style={{ height: 420 }}>`): `Table` меряет её через ResizeObserver и в контейнере без высоты схлопывается.

## Паттерн

`useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })` → `<Table table={table} isLoading={false} pagination={...} />`. Рабочий минимальный пример — в конце `setup.md`.

Типизация строки:

- тип строки обязан иметь поле, общее с `WithRowClickLink`, — добавить `onRowClick?: () => void`, иначе `TS2559`;
- дженерик `Table` в TSX не выводится → `const ProductTable = Table<Product>;` и рендерить `<ProductTable />`.

Выбор строк, видимость колонок — состояние `useReactTable` (`table.getState()`); пропов `rowSelection`, `columnVisibility`, `fillContainerSpace` у `Table` в 31.x нет.

## Готовые части

- **Ячейки** (`data-grid/cells`): `NameCell`, `TextCell` (требует `isArchived` и `isDisabled`), `CheckboxCell` (`{ row, table }`), `LinkCell`, `DateCell`, `BooleanCell`, `InputCell`, `SelectCell`, `ImageCell`, `EditableCellWrapper` и другие.
- **Заголовки** (`data-grid/headers`): `CheckboxHeader` (`{ table, column }`), `TextHeader`, `NumberHeader`, `DateHeader`, `LinkHeader`, `HeaderBuilder` и фильтры. `Dropdown` из `headers` — deprecated, брать `Dropdown` из главного входа.
- **Pagination** из data-grid: `{ total, pageSize, startItemIndex, isDisabled, onPaginationChange(start, perPage) }`.
- **Пропы `Table` в 31.x:** `rowClickCallOrder`, виртуализация `isVirtualization` + `overscan` + `rangeChanged`; `DnDConfig.onDragEnd` получает третьим аргументом `rowId`.
- **Своя локаль фильтра дат** (`DateRangeFilterLocale`) в 31.x перестроена: строки в `translate`, форматы в `format`.

Пример с выбором строк, ячейками и пагинацией — `src/stories/demos/DataGridTable.stories.tsx` в репозитории витрины (ссылка в SKILL.md).
