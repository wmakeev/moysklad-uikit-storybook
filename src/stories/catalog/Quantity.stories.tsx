import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Quantity } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Forms/Quantity',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [qty, setQty] = useState(1);
    return (
      <Quantity
        name="qty"
        value={qty}
        min={0}
        max={99}
        step={1}
        onChange={(_, v) => setQty(Number(v))}
      />
    );
  },
};
