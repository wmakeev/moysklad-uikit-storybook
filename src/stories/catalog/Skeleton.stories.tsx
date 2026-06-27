import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Skeleton',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={10} style={{ maxWidth: 360 }}>
      <Skeleton width={200} height={20} />
      <Skeleton width={320} height={14} />
      <Skeleton width={280} height={14} />
      <Skeleton width={120} height={36} />
    </Col>
  ),
};
