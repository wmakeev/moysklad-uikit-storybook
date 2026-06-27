import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabelValueDate } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValueDate',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [date, setDate] = useState<Date | string | null>(null);
    return (
      <div style={box}>
        <LabelValueDate
          label="Дата отгрузки"
          value={date}
          onChange={(d) => setDate(d)}
          emptyText="Не указана"
          placeholder="Выберите дату"
          showIcon
        />
      </div>
    );
  },
};
