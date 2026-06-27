import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Placement, Button } from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/Tooltip',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Row gap={40} style={{ padding: 40 }}>
      <Tooltip placement={Placement.TOP} offset={[0, 0]} overlay="Подсказка сверху">
        <Button variant="secondary">Наведи (top)</Button>
      </Tooltip>
      <Tooltip placement={Placement.RIGHT} offset={[0, 0]} overlay="Подсказка справа">
        <Button variant="secondary">Наведи (right)</Button>
      </Tooltip>
    </Row>
  ),
};
