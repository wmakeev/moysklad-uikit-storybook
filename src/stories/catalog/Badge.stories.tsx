import type { Meta, StoryObj } from '@storybook/react';
import { Badge, badgeColors } from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Badge',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Row>
      {Object.values(badgeColors).map((variant) => (
        <Badge key={variant} variant={variant} label={variant} />
      ))}
    </Row>
  ),
};
