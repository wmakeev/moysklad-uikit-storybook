# Стек для приложения на `@moysklad/uikit`

Инструкция для инициализации нового приложения поверх дизайн-системы
`@moysklad/uikit` **v28.x**. Описывает обязательный стек, настройку, подключение
токенов и неочевидные ловушки рантайма (собраны на практике, см. в конце).

> Цель файла — дать агенту-инициализатору всё, чтобы поднять рабочий каркас
> приложения и сразу избежать типовых граблей. Это **не** про Storybook-витрину
> (она в этом репозитории отдельно), а про продакшн-приложение на uikit.

---

## 1. Базовый стек (обязательно)

| Слой | Выбор | Версия | Примечание |
|------|-------|--------|------------|
| UI-библиотека | `@moysklad/uikit` | `^28.1.0` | peer: React 17/18 |
| Framework | `react` + `react-dom` | `^18.3.1` | ставить именно 18 |
| Язык | `typescript` | `^5.6` | `strict: true` |
| Бандлер | `vite` | `^5.4` | + `@vitejs/plugin-react` `^4.3` |
| Таблицы | `@tanstack/react-table` | **`8.21.3` (точно!)** | только если нужен `data-grid` |
| Node / npm | Node `24`, npm `11` | — | ESM-окружение |

Ключевые свойства окружения:

- **Пакет ESM-only** (`"type": "module"`). Приложение тоже должно быть ESM
  (`"type": "module"` в `package.json`). CommonJS-`require` пакета не поддержан.
- **Никакого CSS-in-JS / Tailwind не требуется.** Стили компонентов — CSS-модули,
  они **самоинжектятся** при импорте компонента (в `dist` каждый `*.js`
  подтягивает свой `*.module.js`). Глобально руками подключается **только файл
  токенов** (см. §3).
- **Шрифт** дизайн-системы — *ALS Hauss* (в пакет не входит). Без него вёрстка
  работает (fallback на системный sans-serif); при наличии лицензии — подключить
  `@font-face` отдельно.

### `@tanstack/react-table` — почему точная версия

`data-grid` построен на `@tanstack/react-table 8.21.3` и требует **единый инстанс**
с uikit, иначе React-контекст таблицы не совпадёт и таблица не отрендерится.
Фиксировать **точной** версией (без `^`) в `dependencies`. Если data-grid не нужен —
зависимость не добавлять вовсе.

---

## 2. `package.json` (каркас)

```json
{
  "name": "my-app",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@moysklad/uikit": "^28.1.0",
    "@tanstack/react-table": "8.21.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.6.3",
    "vite": "^5.4.11"
  }
}
```

`vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
```

---

## 3. `tsconfig.json`

Критичные опции: `moduleResolution: "bundler"` (нужно для subpath-`exports`
пакета), `jsx: "react-jsx"`, `strict: true`, ESM-модули.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "noEmit": true,
    "useDefineForClassFields": true
  },
  "include": ["src"]
}
```

---

## 4. Подключение токенов и базовая обвязка

Токены подключаются **один раз** на входе приложения:

```ts
// main.tsx — один раз на всё приложение
import '@moysklad/uikit/colorVariables.css';
```

Структура токенов внутри `colorVariables.css` — CSS `@layer lognex` с подслоями:
- `basic` — палитра;
- `ms` — семантика: `--text-*`, `--bgd-*`, `--button-*`, `--border-*`,
  `--elements-*`, `--badge-*`;
- `status` — `--status-*`.

Используйте семантические переменные (`var(--text-primary)`, `var(--bgd-white)` и
т.п.), а не сырую палитру.

### Точки импорта пакета

| Что | Импорт |
|-----|--------|
| Компоненты (большинство) | `import { Button, Text, Modal } from '@moysklad/uikit'` |
| Иконки (306 шт.) | `import { Check20Icon } from '@moysklad/uikit/icon'` |
| Таблицы | `import { Table, ... } from '@moysklad/uikit/data-grid'` |
| Токены (CSS) | `import '@moysklad/uikit/colorVariables.css'` |

Иконки: размеры 12/16/20px, имена вида `Name{12|16|20}Icon`, пропы
`{ stroke?, width?, height?, className? }`. **Имена не угадывать** — сверять по
`node_modules/@moysklad/uikit/dist/icon/components/` (напр. `Info16Icon` не
существует → `InformationCircle16Icon`).

Типографика: компонент `Text` с `variant`
(`body | bodyL | bodyStrong | bodyXL | caption | heading1..4`) + шорткаты
`Text.H1..H4 / Text.Body / Text.Caption`; цвета через `TextColor`
(`primary, secondary, tertiary, accent, positive, critical, attention, invert`).

---

## 5. Провайдеры, которые нужно обернуть вокруг дерева

Некоторые компоненты **молча не работают** без своего провайдера/контекста.
Поставьте их на корне приложения заранее:

- **Snackbar (тосты):** обернуть дерево в `<Snackbar>`; внутри —
  `useSnackbar().showSnackbar({ message })`.
- **BottomSheet:** требует `<BottomSheetContextProvider>` (есть в главном входе).
  Без него `root === null` и шторка **молча не открывается, без ошибки**.
- **DataGrid:** обернуть в `LocaleContextProvider lang/locale={ELanguages.RU}`
  (локаль для ячеек и пагинации).

Пример корня:

```tsx
import '@moysklad/uikit/colorVariables.css';
import { Snackbar } from '@moysklad/uikit';
import { BottomSheetContextProvider } from '@moysklad/uikit';

function Root() {
  return (
    <Snackbar>
      <BottomSheetContextProvider>
        <App />
      </BottomSheetContextProvider>
    </Snackbar>
  );
}
```

---

## 6. Ловушки импорта и API (важно)

### Не все компоненты — в главном входе
Часть реэкспортируется только через подпуть `@moysklad/uikit/components/<Name>`,
а **не** из `@moysklad/uikit`. Проверка наличия в главном входе —
`node_modules/@moysklad/uikit/dist/index.d.ts`; все подпути перечислены в
`package.json → exports`. Известные «только подпуть»:

```tsx
import { FieldRow } from '@moysklad/uikit/components/FieldRow';
import { Label } from '@moysklad/uikit/components/Label';
import { LabelValue } from '@moysklad/uikit/components/LabelValue';
import { Info } from '@moysklad/uikit/components/Info';
import { Indicator } from '@moysklad/uikit/components/Indicator';
import { ImagePreview } from '@moysklad/uikit/components/ImagePreview';
import { InputClear } from '@moysklad/uikit/components/InputClear';
```

### Deprecated → не использовать
`Switch` → `SegmentButton`; `Header` → `Text`/`Text.H1..`; `Typography` → `Text`.
Дают рантайм-предупреждения в консоли.

### Контролируемость по умолчанию
Почти всё — controlled (писать через `useState`). `Toggle.onChange` обязателен
(uncontrolled-режима нет). `Checkbox/Radiobutton`: `onChange(e)`, где `e.target`
кастуется к `HTMLInputElement`.

### Точечные API-нюансы (частые)
- **Datepicker:** `localeFormat` — это **BCP-47-локаль для `Intl.DateTimeFormat`**
  (напр. `'ru-RU'`), **а не паттерн формата**. Передача `'dd.MM.yyyy'` →
  `RangeError: Invalid language tag`. Формат вывода — через
  `dateTimeFormatOptions: Intl.DateTimeFormatOptions`. Обязательны также `lang`
  (`ELanguages.RU`), `selectedDate`, `onDateChanged`.
- **AutoComplete:** `renderInput` обязателен; его `ref` **обязательно** привязать к
  `input` (якорь дропдауна floating-ui) — иначе рантайм-краш
  `Cannot read properties of null (reading 'getBoundingClientRect')`. Его
  `onChange` вызывается без аргументов.
- **Tooltip:** обязательны `placement` и `offset: [number, number]`.
- **Select:** `value` — это опция целиком (`ISelectOption<T>`), не raw-значение;
  `onChange(option)`.
- **Dropdown:** требует `triggerRef: RefObject<HTMLElement>`, `open`,
  `onClose(reason?)`.
- **Chip:** использовать **new API** (`label`, `selected`, `onSelectedChange`,
  `variant`, `clearable`), не legacy.
- Compound-компоненты: `Modal.Header/Body/Footer`, `Tabs`+`Tabs.Item`,
  `SegmentButton.Group`+`SegmentButton`, `Breadcrumbs`+`Breadcrumbs.Item`
  (не проп `items`).

### Дженерики uikit + TSX (weak-type)
Если дженерик ограничен «слабым» типом (только опциональные поля, как
`WithRowClickLink` в `Table`): (1) тип-аргумент должен иметь хотя бы одно общее
поле с ограничением (иначе `TS2559`); (2) в TSX вывод дженерика падает —
фиксировать instantiation-выражением: `const ProductTable = Table<Product>;` и
рендерить `<ProductTable .../>`.

---

## 7. DataGrid (`@moysklad/uikit/data-grid`) — если нужен

- Паттерн: `useReactTable({...})` → `<Table table={...} isLoading pagination={...} />`.
- Готовые ячейки (`data-grid/cells`): `NameCell`, `TextCell` (требует
  `isArchived`/`isDisabled`), `CheckboxCell` (`{row, table}`), `LinkCell`,
  `DateCell`, `BooleanCell`, `InputCell`, `SelectCell`, `ImageCell` и др.
- Готовые заголовки (`data-grid/headers`): `CheckboxHeader`, `TextHeader`,
  `NumberHeader`, `DateHeader`, `LinkHeader`, `HeaderBuilder` + фильтры.
- `Pagination` из data-grid:
  `{ total, pageSize, startItemIndex, isDisabled, onPaginationChange(start, perPage) }`.
- Контейнеру таблицы **задавать высоту** (Table сам считает высоту через
  ResizeObserver). Самый рантайм-чувствительный компонент — проверять в браузере.

---

## 8. Как узнавать API правильно (метод)

`tsc` и `build` **не ловят рантайм-падения** (неверное значение пропа,
отсутствующий провайдер/якорь). Поэтому:

1. **Читать API из `dist`**, а не угадывать:
   - компонент: `node_modules/@moysklad/uikit/dist/components/<Name>/<Name>.d.ts`;
   - пропсы часто вынесены в `<Name>.types.d.ts` (Checkbox, Radiobutton, Toggle,
     Chip) — `<Name>.d.ts` лишь реэкспортирует;
   - иконки: `dist/icon/components/`; токены: `dist/colorVariables.css`;
     локали/язык: `dist/context/`.
2. Проверить, есть ли компонент в `dist/index.d.ts`; если нет — импорт через
   подпуть.
3. **Верификация:** `npx tsc --noEmit` → затем `vite build` → затем **обязательно
   прогон в браузере** интерактивных компонентов (оверлеи, datepicker,
   autocomplete, data-grid) — статические проверки их падения пропускают.

> ⚠️ `require('@moysklad/uikit/package.json')` падает
> (`ERR_PACKAGE_PATH_NOT_EXPORTED`). Чтобы прочитать `exports`-мапу:
> `cd node_modules/@moysklad/uikit && node -e "console.log(require('./package.json').exports)"`
> либо читать файл напрямую.

---

## 9. Пример: `main.tsx` + `App.tsx`

Минимальный, но «настоящий» каркас: токены, провайдеры на корне, форма
(`Input` + `Select` + `Button`) с тостом и небольшая таблица `data-grid`.
Пропсы сверены по `dist/*.d.ts` для uikit v28.

### `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Токены дизайн-системы — подключаются ОДИН раз на всё приложение.
import '@moysklad/uikit/colorVariables.css';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### `src/App.tsx`

```tsx
import { useMemo, useState } from 'react';
import {
  Button,
  Input,
  Select,
  Snackbar,
  Text,
  TextColor,
  useSnackbar,
  LocaleContextProvider,
  ELanguages,
  type ISelectOption,
} from '@moysklad/uikit';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from '@moysklad/uikit/data-grid';

// --- Провайдеры на корне приложения -----------------------------------------
// Snackbar — для тостов (useSnackbar внутри дерева);
// LocaleContextProvider — локаль для ячеек/пагинации data-grid.
export function App() {
  return (
    <Snackbar>
      <LocaleContextProvider lang={ELanguages.RU} locale={ELanguages.RU}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
          <Text.H1>Демо-приложение на @moysklad/uikit</Text.H1>
          <ProductForm />
          <ProductTableDemo />
        </div>
      </LocaleContextProvider>
    </Snackbar>
  );
}

// --- Форма: Input + Select + Button + тост ----------------------------------
const STATUS_OPTIONS: ISelectOption<string>[] = [
  { label: 'В наличии', value: 'in_stock' },
  { label: 'Под заказ', value: 'on_order' },
  { label: 'Снят с продажи', value: 'archived' },
];

function ProductForm() {
  const { showSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  // Select хранит ОПЦИЮ целиком (ISelectOption), а не raw-значение.
  const [status, setStatus] = useState<ISelectOption<string> | undefined>();

  const handleSubmit = () => {
    if (!name.trim()) {
      showSnackbar({ message: 'Укажите наименование' });
      return;
    }
    showSnackbar({ message: `Сохранено: ${name} (${status?.label ?? '—'})` });
  };

  return (
    <section style={{ display: 'grid', gap: 16, margin: '24px 0' }}>
      <Input
        name="name"
        label="Наименование"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        clearable
        onClear={() => setName('')}
      />

      <Select<string>
        label="Статус"
        placeholder="Выберите статус"
        options={STATUS_OPTIONS}
        value={status}
        onChange={(option) => setStatus(option)}
        clearable
        onClear={() => setStatus(undefined)}
      />

      <div>
        <Button variant="accent" size="l" onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
    </section>
  );
}

// --- Таблица data-grid (минимальный сценарий) -------------------------------
// Тип строки ДОЛЖЕН иметь поле, общее с WithRowClickLink (иначе TS2559).
interface Product {
  id: string;
  name: string;
  price: number;
  onRowClick?: () => void; // ← общее с WithRowClickLink
}

const DATA: Product[] = [
  { id: '1', name: 'Кофе зерновой', price: 1290 },
  { id: '2', name: 'Чай улун', price: 740 },
];

const columnHelper = createColumnHelper<Product>();
const columns = [
  columnHelper.accessor('name', { header: 'Наименование' }),
  columnHelper.accessor('price', {
    header: 'Цена',
    cell: (c) => `${c.getValue()} ₽`,
  }),
];

// Дженерик Table инвариантен в TSX — фиксируем instantiation-выражением.
const ProductTable = Table<Product>;

function ProductTableDemo() {
  const table = useReactTable({
    data: useMemo(() => DATA, []),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section style={{ marginTop: 24 }}>
      <Text variant="bodyStrong" color={TextColor.SECONDARY}>
        Товары
      </Text>
      {/* Контейнеру задаём высоту — Table считает высоту через ResizeObserver. */}
      <div style={{ height: 320, marginTop: 8 }}>
        <ProductTable table={table} isLoading={false} />
      </div>
    </section>
  );
}
```

> ⚠️ Точные имена/значения (`TextColor.SECONDARY`, `ELanguages.RU`,
> `ButtonVariants`) и пропсы конкретных компонентов всегда сверяйте по
> `dist/*.d.ts` — версии API меняются между минорами. Готовые ячейки/заголовки
> для таблицы (`NameCell`, `LinkCell`, `CheckboxHeader`, …) — в §7 и в
> `dist/data-grid/cells|headers`.
