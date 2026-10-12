# Каркас приложения на @moysklad/uikit

Сверено с uikit 31.20.0. Готово, когда `npx tsc --noEmit` и `vite build` проходят, а пример из конца файла открывается в браузере без ошибок консоли.

## Стек

| Слой | Выбор | Версия | Примечание |
| --- | --- | --- | --- |
| UI-библиотека | `@moysklad/uikit` | `^31.20.0` | peer: React 17/18 |
| Framework | `react` + `react-dom` | `^18.3.1` | именно 18 |
| Язык | `typescript` | `^5.6` | `strict: true` |
| Бандлер | `vite` | `^5.4` | + `@vitejs/plugin-react` `^4.3` |
| Таблицы | `@tanstack/react-table` | **`8.21.3` точно** | только если нужен data-grid |
| Node / npm | Node 24, npm 11 | — | ESM |

- **Пакет ESM-only.** Приложение тоже ESM (`"type": "module"`); `require` пакета не работает.
- **Стили самоинжектятся.** Каждый компонент в `dist` подтягивает свой CSS-модуль при импорте. Tailwind и CSS-in-JS не нужны; глобально подключается только файл токенов.
- **Шрифт ALS Hauss** в пакет не входит. Без него работает системный sans-serif; при лицензии — свой `@font-face`.
- **`@tanstack/react-table` точной версией, без `^`.** data-grid требует единый инстанс с uikit, иначе контекст таблицы не совпадёт и таблица не отрисуется. Нет data-grid — зависимость не ставить.

## package.json и vite

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
    "@moysklad/uikit": "^31.20.0",
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

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
```

## tsconfig.json

`moduleResolution: "bundler"` обязателен: без него не резолвятся подпути из `exports` пакета.

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

Источник истины по типам — `npx tsc --noEmit`; диагностика IDE бывает устаревшей.

## Токены

Один раз на входе приложения: `import '@moysklad/uikit/colorVariables.css';`

Внутри — `@layer lognex` с подслоями:

- `basic` — палитра;
- `ms` — семантика: `--text-*`, `--bgd-*`, `--button-*`, `--border-*`, `--elements-*`, `--badge-*`;
- `status` — `--status-*`;
- `gwt-status` — `--gwt-statuses-*`, 16 цветов `StatusBadge`;
- `viewers-stack` — `--viewers-stack-*`, аватары `ViewersStack`.

В вёрстке — семантические переменные (`var(--text-primary)`, `var(--bgd-white)`, `var(--border-normal)`), не палитра. В 31.x добавлены `--light-blue-50`, `--bgd-accent`, `--border-focused`; удалён `--elements-disabled`.

## Точки импорта

| Что | Импорт |
| --- | --- |
| Компоненты, хуки, утилиты | `import { Button, Text, Modal } from '@moysklad/uikit'` |
| Девять подпутевых компонентов | `import { Panel } from '@moysklad/uikit/components/Panel'` — список в SKILL.md |
| Иконки (318) | `import { Check20Icon } from '@moysklad/uikit/icon'` — главный вход их тоже реэкспортирует |
| Таблицы | `import { Table } from '@moysklad/uikit/data-grid'` |
| Токены | `import '@moysklad/uikit/colorVariables.css'` |

- **Иконки:** размеры 12/16/20, имена `Name{12|16|20}Icon`, пропы `{ stroke?, width?, height?, className? }`. Имя сверять по `dist/icon/components/`.
- **Типографика:** `Text` с `variant` (`body | bodyL | bodyStrong | bodyXL | caption | heading1..4`) и шорткатами `Text.H1..H4`, `Text.Body`, `Text.Caption`; цвет — `TextColor` (`primary, secondary, tertiary, accent, positive, critical, attention, invert`).
- **`exports` пакета** через `require('@moysklad/uikit/package.json')` не прочитать (`ERR_PACKAGE_PATH_NOT_EXPORTED`) — читать файл `node_modules/@moysklad/uikit/package.json` напрямую.

## Провайдеры на корне

| Провайдер | Кому нужен | Без него |
| --- | --- | --- |
| `<Snackbar>` | `useSnackbar().showSnackbar({ message })` | тостов нет |
| `<BottomSheetContextProvider>` | `BottomSheet` | шторка не открывается, ошибки нет |
| `<LocaleContextProvider lang={ELanguages.RU} locale={ELanguages.RU}>` | data-grid; `DateRange` для смены языка | ячейки и пагинация без локали |

Все три — из главного входа.

## Пример: main.tsx + App.tsx

Токены, провайдеры, форма с тостом и таблица data-grid. Пропы сверены по `dist/*.d.ts` 31.20.0.

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@moysklad/uikit/colorVariables.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```tsx
// src/App.tsx
import { useMemo, useState } from 'react';
import {
  BottomSheetContextProvider,
  Button,
  ELanguages,
  Input,
  LocaleContextProvider,
  Select,
  Snackbar,
  Text,
  TextColor,
  useSnackbar,
  type ISelectOption,
} from '@moysklad/uikit';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table } from '@moysklad/uikit/data-grid';

export function App() {
  return (
    <Snackbar>
      <BottomSheetContextProvider>
        <LocaleContextProvider lang={ELanguages.RU} locale={ELanguages.RU}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
            <Text.H1>Демо-приложение на @moysklad/uikit</Text.H1>
            <ProductForm />
            <ProductTableDemo />
          </div>
        </LocaleContextProvider>
      </BottomSheetContextProvider>
    </Snackbar>
  );
}

const STATUS_OPTIONS: ISelectOption<string>[] = [
  { label: 'В наличии', value: 'in_stock' },
  { label: 'Под заказ', value: 'on_order' },
  { label: 'Снят с продажи', value: 'archived' },
];

function ProductForm() {
  const { showSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  // Select хранит опцию целиком, а не raw-значение.
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

// Тип строки обязан иметь поле, общее с WithRowClickLink, иначе TS2559.
interface Product {
  id: string;
  name: string;
  price: number;
  onRowClick?: () => void;
}

const DATA: Product[] = [
  { id: '1', name: 'Кофе зерновой', price: 1290 },
  { id: '2', name: 'Чай улун', price: 740 },
];

const columnHelper = createColumnHelper<Product>();
const columns = [
  columnHelper.accessor('name', { header: 'Наименование' }),
  columnHelper.accessor('price', { header: 'Цена', cell: (c) => `${c.getValue()} ₽` }),
];

// Дженерик Table в TSX не выводится — фиксируется instantiation-выражением.
const ProductTable = Table<Product>;

function ProductTableDemo() {
  const table = useReactTable({
    data: useMemo(() => DATA, []),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section style={{ marginTop: 24 }}>
      <Text variant="bodyStrong" color={TextColor.secondary}>
        Товары
      </Text>
      {/* Высота контейнера обязательна: Table меряет её через ResizeObserver. */}
      <div style={{ height: 320, marginTop: 8 }}>
        <ProductTable table={table} isLoading={false} />
      </div>
    </section>
  );
}
```
