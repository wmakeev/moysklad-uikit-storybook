import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Input',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 360 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [v, setV] = useState('');
    return (
      <Col gap={20} style={box}>
        <Input
          name="name"
          label="Имя"
          placeholder="Введите имя"
          value={v}
          onChange={(e) => setV(e.target.value)}
          clearable
          onClear={() => setV('')}
        />
        <Input name="req" label="Обязательное" required placeholder="Не заполнено" />
        <Input name="err" label="С ошибкой" error defaultValue="неверно" />
        <Input name="dis" label="Disabled" disabled defaultValue="недоступно" />
      </Col>
    );
  },
};
