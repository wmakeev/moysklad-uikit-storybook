import type { Meta, StoryObj } from '@storybook/react';
import { BentoBlock, Text, TextVariant } from '@moysklad/uikit';
import { Panel, type PanelItem } from '@moysklad/uikit/components/Panel';
import { LabelValue } from '@moysklad/uikit/components/LabelValue';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Containers/Panel',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--bgd-secondary)', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;

const field = (id: string, label: string, value: string, width: number): PanelItem => ({
  id,
  width,
  element: <LabelValue label={label} value={value} />,
});

const ITEMS: PanelItem[] = [
  field('status', 'Статус', 'Проведён', 1),
  field('sum', 'Сумма', '14 990 ₽', 1),
  field('date', 'Дата', '12.10.2026', 1),
  field('client', 'Контрагент', 'ООО «Ромашка»', 2),
  field('store', 'Склад', 'Основной склад', 2),
  field('comment', 'Комментарий', 'Доставить до 18:00, звонить за час', 3),
];

const cell = (id: string, text: string, width: number): PanelItem => ({
  id,
  width,
  element: (
    <div
      style={{
        background: 'var(--light-blue-50, #eef5ff)',
        border: '1px dashed var(--border-focused, #3b82f6)',
        borderRadius: 6,
        padding: '8px 12px',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Text variant={TextVariant.caption}>{text}</Text>
    </div>
  ),
});

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={8}>
      <Section title="Сетка полей" description="Элементы разной ширины (width 1, 2, 3 колонки) в сетке из 6 колонок внутри BentoBlock.">
        <BentoBlock>
          <Panel items={ITEMS} />
        </BentoBlock>
      </Section>

      <Section title="columnsCount" description="Число колонок: 3 и 6 (по умолчанию 6, максимум 40).">
        <Col gap={16}>
          <Panel
            columnsCount={3}
            items={[cell('a', 'width 1', 1), cell('b', 'width 1', 1), cell('c', 'width 1', 1), cell('d', 'width 2', 2), cell('e', 'width 1', 1)]}
          />
          <Panel
            columnsCount={6}
            items={[cell('a', 'width 1', 1), cell('b', 'width 2', 2), cell('c', 'width 3', 3), cell('d', 'width 6', 6)]}
          />
        </Col>
      </Section>

      <Section title="rowGap и columnGap" description="Слева значения по умолчанию (12 и 20), справа увеличенные (32 и 8).">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Panel
            columnsCount={3}
            items={[1, 2, 3, 4, 5, 6].map((n) => cell(`d${n}`, `ячейка ${n}`, 1))}
          />
          <Panel
            columnsCount={3}
            rowGap={32}
            columnGap={8}
            items={[1, 2, 3, 4, 5, 6].map((n) => cell(`g${n}`, `ячейка ${n}`, 1))}
          />
        </div>
      </Section>

      <Section title="Panel.EmptyItem" description="Пустая ячейка занимает место в сетке и сдвигает соседей.">
        <Panel
          columnsCount={4}
          items={[
            cell('e1', 'width 1', 1),
            { id: 'empty', width: 2, element: <Panel.EmptyItem /> },
            cell('e2', 'width 1', 1),
            cell('e3', 'width 4', 4),
          ]}
        />
      </Section>

      <Section title="width больше columnsCount" description="Ширина обрезается до числа колонок: width 5 в сетке из 3 колонок занимает всю строку.">
        <Panel columnsCount={3} items={[cell('w1', 'width 5, обрезано до 3', 5), cell('w2', 'width 1', 1), cell('w3', 'width 2', 2)]} />
      </Section>
    </Col>
  ),
};
