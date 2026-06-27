import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabSize } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Navigation/Tabs',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [value, setValue] = useState<string | number>('info');
    return (
      <Col gap={24}>
        {Object.values(TabSize).map((size) => (
          <Tabs key={size} size={size} value={value} onChange={setValue} aria-label="Разделы">
            <Tabs.Item value="info">Основное</Tabs.Item>
            <Tabs.Item value="prices">Цены</Tabs.Item>
            <Tabs.Item value="stock">Остатки</Tabs.Item>
          </Tabs>
        ))}
      </Col>
    );
  },
};
