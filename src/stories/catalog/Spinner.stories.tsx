import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, SpinnerSize } from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Spinner',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Row gap={32}>
      {Object.values(SpinnerSize).map((size) => (
        <Spinner key={size} size={size} />
      ))}
      <Spinner size={SpinnerSize.M}>Загрузка данных…</Spinner>
    </Row>
  ),
};
