import type { Meta, StoryObj } from '@storybook/react';
import { LabelValue } from '@moysklad/uikit/components/LabelValue';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValue',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={4} style={box}>
      <LabelValue label="Статус" value="Проведён" />
      <LabelValue label="Сумма" value="14 990 ₽" />
      <LabelValue label="Комментарий" value="" isEmpty />
    </Col>
  ),
};
