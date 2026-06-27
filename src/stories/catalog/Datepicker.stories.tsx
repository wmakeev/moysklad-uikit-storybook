import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Datepicker, ELanguages } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Forms/Datepicker',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={box}>
        <Datepicker
          label="Дата"
          lang={ELanguages.RU}
          // localeFormat — это локаль для Intl.DateTimeFormat (BCP-47), НЕ паттерн формата
          localeFormat={ELanguages.RU}
          dateTimeFormatOptions={{ day: '2-digit', month: '2-digit', year: 'numeric' }}
          selectedDate={date}
          onDateChanged={(d) => setDate(d)}
          placeholder="дд.мм.гггг"
          showIcon
        />
      </div>
    );
  },
};
