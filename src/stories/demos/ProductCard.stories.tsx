import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Text,
  Badge,
  Button,
  ButtonVariants,
  Tabs,
  Input,
  Textfield,
  Select,
  Checkbox,
  HStack,
  VStack,
  type ISelectOption,
} from '@moysklad/uikit';
import { Add16Icon } from '@moysklad/uikit/icon';

/**
 * Демо-сборка: карточка товара. Показывает, как компоненты uikit
 * собираются в реальный экран редактирования.
 */

const meta: Meta = {
  title: 'Демо-сборки/Карточка товара',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

const GROUPS: ISelectOption<string>[] = [
  { value: 'tech', label: 'Электроника' },
  { value: 'home', label: 'Для дома' },
  { value: 'toys', label: 'Игрушки' },
];

const Card = () => {
  const [tab, setTab] = useState<string | number>('main');
  const [name, setName] = useState('Наушники Aero Pro');
  const [group, setGroup] = useState<ISelectOption<string> | null>(GROUPS[0]);
  const [weighable, setWeighable] = useState(false);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      {/* Шапка */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <HStack size="s12">
          <Text variant="heading2">{name}</Text>
          <Badge variant="green" label="В продаже" />
        </HStack>
        <HStack size="s8">
          <Button variant={ButtonVariants.SECONDARY}>Отмена</Button>
          <Button variant={ButtonVariants.PRIMARY}>Сохранить</Button>
        </HStack>
      </div>

      {/* Табы */}
      <div style={{ marginBottom: 24 }}>
        <Tabs value={tab} onChange={setTab} aria-label="Разделы карточки">
          <Tabs.Item value="main">Основное</Tabs.Item>
          <Tabs.Item value="prices">Цены</Tabs.Item>
          <Tabs.Item value="stock">Остатки</Tabs.Item>
        </Tabs>
      </div>

      {/* Контент */}
      {tab === 'main' && (
        <VStack
          size="s20"
          style={{
            background: 'var(--bgd-white)',
            border: '1px solid var(--border-disable)',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <Input name="name" label="Наименование" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input name="code" label="Код" placeholder="Артикул / код" />
          <div style={{ maxWidth: 320 }}>
            <Select
              label="Группа товаров"
              options={GROUPS}
              value={group ?? undefined}
              onChange={setGroup}
              clearable
              onClear={() => setGroup(null)}
              placeholder="Выберите группу"
            />
          </div>
          <Textfield name="desc" label="Описание" placeholder="Краткое описание товара…" autoVerticalResize limit={300} showCounterLimit={300} />
          <Checkbox name="weighable" label="Весовой товар" checked={weighable} onChange={(e) => setWeighable((e.target as HTMLInputElement).checked)} />
        </VStack>
      )}

      {tab === 'prices' && (
        <VStack size="s16" style={panelStyle}>
          <Input name="buy" label="Закупочная цена" defaultValue="3 200" />
          <Input name="sell" label="Цена продажи" defaultValue="4 990" />
          <Button variant={ButtonVariants.SECONDARY}>
            <Add16Icon /> Добавить тип цены
          </Button>
        </VStack>
      )}

      {tab === 'stock' && (
        <div style={panelStyle}>
          <Text color="secondary">Остаток на основном складе: 124 шт.</Text>
        </div>
      )}
    </div>
  );
};

const panelStyle = {
  background: 'var(--bgd-white)',
  border: '1px solid var(--border-disable)',
  borderRadius: 12,
  padding: 24,
} as const;

export const Default: Story = {
  name: 'Экран',
  render: () => <Card />,
};
