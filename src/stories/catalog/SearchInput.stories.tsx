import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/SearchInput',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 360 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [last, setLast] = useState('');
    return (
      <Col gap={12} style={box}>
        <SearchInput placeholder="Поиск по товарам…" onSearch={setLast} fullWidth />
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
          Последний запрос: {last || '—'}
        </span>
      </Col>
    );
  },
};
