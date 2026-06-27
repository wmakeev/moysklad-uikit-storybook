import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentButton } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Actions/SegmentButton',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [value, setValue] = useState<string | number>('all');
    return (
      <SegmentButton.Group value={value} onChange={setValue} aria-label="Фильтр">
        <SegmentButton value="all">Все</SegmentButton>
        <SegmentButton value="active">Активные</SegmentButton>
        <SegmentButton value="archived">Архив</SegmentButton>
      </SegmentButton.Group>
    );
  },
};
