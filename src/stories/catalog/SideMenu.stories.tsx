import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SideMenu } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Navigation/SideMenu',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [selected, setSelected] = useState('products');
    const items = [
      { id: 'products', label: 'Товары' },
      { id: 'orders', label: 'Заказы' },
      { id: 'customers', label: 'Покупатели' },
      { id: 'reports', label: 'Отчёты' },
    ];
    return (
      <div style={{ maxWidth: 240 }}>
        <SideMenu items={items} selectedId={selected} onSelect={setSelected} />
      </div>
    );
  },
};
