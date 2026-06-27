import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Text,
  Badge,
  type BadgeVariant,
  Dot,
  DotColor,
  SearchInput,
  SegmentButton,
  Pagination,
  Button,
  ButtonVariants,
  HStack,
} from '@moysklad/uikit';
import { Add16Icon } from '@moysklad/uikit/icon';

/**
 * Демо-сборка: список товаров с поиском, фильтром-сегментами,
 * статусами и пагинацией. Иллюстрирует «табличный» сценарий.
 */

const meta: Meta = {
  title: 'Демо-сборки/Список товаров',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

type Item = {
  name: string;
  code: string;
  status: 'active' | 'archived';
  stockColor: keyof typeof DotColor;
  badge: { label: string; variant: BadgeVariant };
  price: string;
};

const DATA: Item[] = [
  { name: 'Наушники Aero Pro', code: 'AP-001', status: 'active', stockColor: 'GREEN', badge: { label: 'В продаже', variant: 'green' }, price: '4 990 ₽' },
  { name: 'Чайник Bork K810', code: 'BK-810', status: 'active', stockColor: 'ORANGE', badge: { label: 'Мало', variant: 'orange' }, price: '12 500 ₽' },
  { name: 'Кофемолка Eta', code: 'ET-220', status: 'archived', stockColor: 'RED', badge: { label: 'Нет в наличии', variant: 'red' }, price: '3 200 ₽' },
  { name: 'Лампа настольная Xiaomi', code: 'XM-LMP', status: 'active', stockColor: 'GREEN', badge: { label: 'В продаже', variant: 'green' }, price: '2 100 ₽' },
  { name: 'Робот-пылесос Dreame', code: 'DR-10', status: 'archived', stockColor: 'GREEN', badge: { label: 'Архив', variant: 'grey' }, price: '24 990 ₽' },
];

const List = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string | number>('all');

  const rows = useMemo(
    () =>
      DATA.filter((d) => (filter === 'all' ? true : d.status === filter)).filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, filter],
  );

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <Text variant="heading2">Товары</Text>
        <Button variant={ButtonVariants.PRIMARY}>
          <Add16Icon /> Добавить товар
        </Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: '1 1 320px', maxWidth: 360 }}>
          <SearchInput placeholder="Поиск по названию…" onSearch={setQuery} fullWidth />
        </div>
        <SegmentButton.Group value={filter} onChange={setFilter} aria-label="Фильтр статуса">
          <SegmentButton value="all">Все</SegmentButton>
          <SegmentButton value="active">Активные</SegmentButton>
          <SegmentButton value="archived">Архив</SegmentButton>
        </SegmentButton.Group>
      </div>

      <div style={{ border: '1px solid var(--border-disable)', borderRadius: 12, overflow: 'hidden', background: 'var(--bgd-white)' }}>
        <div style={{ ...rowStyle, background: 'var(--bgd-secondary)', fontWeight: 600 }}>
          <span style={{ width: 24 }} />
          <span style={{ flex: 1 }}>Наименование</span>
          <span style={{ width: 120 }}>Статус</span>
          <span style={{ width: 100, textAlign: 'right' }}>Цена</span>
        </div>
        {rows.length === 0 && (
          <div style={{ padding: 24 }}>
            <Text color="secondary">Ничего не найдено</Text>
          </div>
        )}
        {rows.map((item) => (
          <div key={item.code} style={rowStyle}>
            <span style={{ width: 24, display: 'flex' }}>
              <Dot color={DotColor[item.stockColor]} />
            </span>
            <span style={{ flex: 1 }}>
              <HStack size="s8">
                <Text>{item.name}</Text>
                <Text color="tertiary">{item.code}</Text>
              </HStack>
            </span>
            <span style={{ width: 120 }}>
              <Badge variant={item.badge.variant} label={item.badge.label} isCompact />
            </span>
            <span style={{ width: 100, textAlign: 'right' }}>
              <Text>{item.price}</Text>
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Pagination label={`Показано ${rows.length} из ${DATA.length}`} onFirst={() => {}} onLast={() => {}} onPrev={() => {}} onNext={() => {}} isGoBackDisabled isGoForwardDisabled />
      </div>
    </div>
  );
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 16px',
  borderBottom: '1px solid var(--border-disable)',
  fontSize: 14,
} as const;

export const Default: Story = {
  name: 'Экран',
  render: () => <List />,
};
