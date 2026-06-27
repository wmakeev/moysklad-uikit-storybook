import type { Meta, StoryObj } from '@storybook/react';
import { Hint, HintVariant, Placement, Button } from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/Hint',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Row gap={40} style={{ padding: 40 }}>
      <Hint placement={Placement.TOP} overlay="Стандартная подсказка">
        <Button variant="secondary">Standard</Button>
      </Hint>
      <Hint placement={Placement.TOP} variant={HintVariant.Alert} overlay="Предупреждение">
        <Button variant="secondary">Alert</Button>
      </Hint>
    </Row>
  ),
};
