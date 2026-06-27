import type { Meta, StoryObj } from '@storybook/react';
import { Counter, CounterVariant } from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Counter',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Row>
      <Counter value={5} variant={CounterVariant.FILLED} />
      <Counter value={128} max={99} variant={CounterVariant.FILLED} />
      <Counter value={12} variant={CounterVariant.PLAIN} showIndicator />
    </Row>
  ),
};
