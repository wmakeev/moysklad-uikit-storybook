import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  type RowSelectionState,
} from '@tanstack/react-table';
import { LocaleContextProvider, ELanguages, Badge, Text } from '@moysklad/uikit';
import {
  Table,
  NameCell,
  TextCell,
  CheckboxCell,
  CheckboxHeader,
  Pagination,
} from '@moysklad/uikit/data-grid';

/**
 * Демо-сборка модуля `@moysklad/uikit/data-grid`.
 *
 * DataGrid построен на **@tanstack/react-table**: инстанс таблицы создаётся через
 * `useReactTable(...)` и передаётся в `<Table table={...} />`. Ячейки и заголовки —
 * готовые компоненты модуля (NameCell, TextCell, CheckboxCell, CheckboxHeader…).
 *
 * Важно: `@tanstack/react-table` должен быть тем же инстансом, что использует uikit
 * (в проекте зафиксирован 8.21.3).
 */

const meta: Meta = {
  title: 'Демо-сборки/DataGrid (таблица)',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

type Product = {
  id: string;
  name: string;
  code: string;
  category: string;
  price: string;
  status: { label: string; variant: 'green' | 'orange' | 'red' | 'grey' };
  // требуется контрактом Table (T extends WithRowClickLink)
  onRowClick?: () => void;
};

const DATA: Product[] = [
  { id: '1', name: 'Наушники Aero Pro', code: 'AP-001', category: 'Электроника', price: '4 990 ₽', status: { label: 'В продаже', variant: 'green' } },
  { id: '2', name: 'Чайник Bork K810', code: 'BK-810', category: 'Для дома', price: '12 500 ₽', status: { label: 'Мало', variant: 'orange' } },
  { id: '3', name: 'Кофемолка Eta', code: 'ET-220', category: 'Для дома', price: '3 200 ₽', status: { label: 'Нет в наличии', variant: 'red' } },
  { id: '4', name: 'Лампа настольная Xiaomi', code: 'XM-LMP', category: 'Электроника', price: '2 100 ₽', status: { label: 'В продаже', variant: 'green' } },
  { id: '5', name: 'Робот-пылесос Dreame', code: 'DR-10', category: 'Электроника', price: '24 990 ₽', status: { label: 'Архив', variant: 'grey' } },
  { id: '6', name: 'Плед хлопковый', code: 'PL-005', category: 'Для дома', price: '1 890 ₽', status: { label: 'В продаже', variant: 'green' } },
];

const columnHelper = createColumnHelper<Product>();

// Фиксируем дженерик Table на Product (иначе TSX выводит его в ограничение WithRowClickLink)
const ProductTable = Table<Product>;

const Grid = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        size: 44,
        header: ({ table, column }) => <CheckboxHeader table={table} column={column} />,
        cell: ({ row, table }) => <CheckboxCell row={row} table={table} />,
      }),
      columnHelper.accessor('name', {
        header: 'Наименование',
        size: 280,
        cell: (ctx) => (
          <NameCell href="#" label={ctx.getValue()} code={ctx.row.original.code} />
        ),
      }),
      columnHelper.accessor('category', {
        header: 'Категория',
        size: 160,
        cell: (ctx) => <TextCell label={ctx.getValue()} isArchived={false} isDisabled={false} />,
      }),
      columnHelper.accessor('status', {
        header: 'Статус',
        size: 140,
        cell: (ctx) => {
          const s = ctx.getValue();
          return <Badge variant={s.variant} label={s.label} isCompact />;
        },
      }),
      columnHelper.accessor('price', {
        header: 'Цена',
        size: 120,
        cell: (ctx) => <TextCell label={ctx.getValue()} isArchived={false} isDisabled={false} />,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: DATA,
    columns,
    state: { rowSelection },
    enableRowSelection: true,
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <LocaleContextProvider lang={ELanguages.RU} locale={ELanguages.RU}>
      <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text variant="heading2">Товары</Text>
          <Text color="secondary">
            {selectedCount > 0 ? `Выбрано: ${selectedCount}` : `Всего: ${DATA.length}`}
          </Text>
        </div>

        <div style={{ height: 420 }}>
          <ProductTable
            table={table}
            isLoading={false}
            pagination={
              <Pagination
                total={DATA.length}
                pageSize={25}
                startItemIndex={0}
                isDisabled={false}
                onPaginationChange={() => {}}
              />
            }
          />
        </div>
      </div>
    </LocaleContextProvider>
  );
};

export const Default: Story = {
  name: 'Таблица с выбором строк',
  render: () => <Grid />,
};
