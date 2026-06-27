import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, type ISelectOption } from '@moysklad/uikit';
import { Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Select',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 360 };

const OPTIONS: ISelectOption<string>[] = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'nsk', label: 'Новосибирск' },
  { value: 'ekb', label: 'Екатеринбург' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [opt, setOpt] = useState<ISelectOption<string> | null>(OPTIONS[0]);
    return (
      <Section title="Select">
        <div style={box}>
          <Select
            options={OPTIONS}
            value={opt ?? undefined}
            onChange={setOpt}
            clearable
            onClear={() => setOpt(null)}
            placeholder="Выберите город"
          />
        </div>
      </Section>
    );
  },
};
