import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabelValueSelect, type ISelectOption } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValueSelect',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const CITIES: ISelectOption<string>[] = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'nsk', label: 'Новосибирск' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [opt, setOpt] = useState<ISelectOption<string>>(CITIES[0]);
    return (
      <div style={box}>
        <LabelValueSelect
          label="Город"
          options={CITIES}
          value={opt}
          onChange={setOpt}
          placeholder="Выберите"
        />
      </div>
    );
  },
};
