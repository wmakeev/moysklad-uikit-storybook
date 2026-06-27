import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MentionsTextfield, type TMentionValue } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Forms/MentionsTextfield',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const MENTIONS = [
  { value: 'ivanov', label: 'Иванов И.' },
  { value: 'petrov', label: 'Петров П.' },
  { value: 'sidorov', label: 'Сидоров С.' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [value, setValue] = useState<TMentionValue>({
      raw: '',
      backend: '',
      mentionsMap: {},
    });
    return (
      <div style={box}>
        <MentionsTextfield
          name="mentions"
          label="Комментарий с упоминаниями (введите @)"
          items={MENTIONS}
          trigger="@"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
