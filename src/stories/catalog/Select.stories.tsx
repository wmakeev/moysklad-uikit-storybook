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

const ARCHIVED_OPTIONS: ISelectOption<string>[] = [
  ...OPTIONS,
  { value: 'old', label: 'Свердловск', isArchived: true },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [opt, setOpt] = useState<ISelectOption<string> | null>(OPTIONS[0]);
    const [archived, setArchived] = useState<ISelectOption<string> | undefined>(
      ARCHIVED_OPTIONS[4],
    );
    return (
      <>
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
        <Section
          title="Архивное значение"
          description="showArchived показывает иконку архива у выбранного значения, inputHintText задаёт текст подсказки при наведении на иконку."
        >
          <div style={box}>
            <Select
              options={ARCHIVED_OPTIONS}
              value={archived}
              onChange={setArchived}
              showArchived
              inputHintText="Город закрыт и находится в архиве"
              placeholder="Выберите город"
            />
          </div>
        </Section>
      </>
    );
  },
};
