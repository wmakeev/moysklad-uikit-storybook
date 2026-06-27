import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabelValueTextfield } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValueTextfield',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [v, setV] = useState('');
    return (
      <div style={box}>
        <LabelValueTextfield
          label="Описание"
          name="lvt"
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="Нажмите, чтобы добавить описание"
          limit={300}
          showCounterLimit={300}
        />
      </div>
    );
  },
};
