import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Actions/Toggle',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <Col gap={12}>
        <Toggle
          name="t1"
          label="Уведомления включены"
          checked={a}
          onChange={(e) => setA(e.target.checked)}
        />
        <Toggle
          name="t2"
          label="Выключено"
          checked={b}
          onChange={(e) => setB(e.target.checked)}
        />
        <Toggle name="t3" label="Disabled" checked disabled onChange={() => {}} />
      </Col>
    );
  },
};
