import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Checkbox',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [c, setC] = useState(true);
    return (
      <Col gap={12}>
        <Checkbox
          name="c1"
          label="Выбрано"
          checked={c}
          onChange={(e) => setC((e.target as HTMLInputElement).checked)}
        />
        <Checkbox name="c2" label="Не выбрано" />
        <Checkbox name="c3" label="Промежуточное" indeterminate />
        <Checkbox name="c4" label="Disabled" disabled checked />
      </Col>
    );
  },
};
