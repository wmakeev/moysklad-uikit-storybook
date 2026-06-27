import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputUnit, type ISelectOption } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Forms/InputUnit',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const UNITS: ISelectOption[] = [
  { value: 'kg', label: 'кг' },
  { value: 'g', label: 'г' },
  { value: 't', label: 'т' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [value, setValue] = useState<number | undefined>(2);
    const [unit, setUnit] = useState<ISelectOption>(UNITS[0]);
    return (
      <div style={box}>
        <InputUnit
          name="weight"
          label="Вес"
          value={value}
          onChangeValue={setValue}
          unitOptions={UNITS}
          selectedUnitOption={unit}
          onUnitChange={setUnit}
        />
      </div>
    );
  },
};
