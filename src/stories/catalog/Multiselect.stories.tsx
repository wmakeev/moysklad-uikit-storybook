import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Multiselect } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Forms/Multiselect',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const MS_ITEMS = [
  { value: 'red', label: 'Красный' },
  { value: 'green', label: 'Зелёный' },
  { value: 'blue', label: 'Синий' },
  { value: 'black', label: 'Чёрный' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [values, setValues] = useState<string[]>(['red']);
    return (
      <div style={box}>
        <Multiselect<string>
          label="Цвета"
          items={MS_ITEMS}
          values={values}
          onChange={setValues}
          placeholder="Выберите цвета"
          getOtherText={(n) => `+${n}`}
        />
      </div>
    );
  },
};
