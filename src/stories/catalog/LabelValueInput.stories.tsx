import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabelValueInput } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValueInput',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [v, setV] = useState('Наушники Aero Pro');
    return (
      <div style={box}>
        <LabelValueInput
          label="Наименование"
          name="lvi"
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="Нажмите, чтобы ввести"
        />
      </div>
    );
  },
};
