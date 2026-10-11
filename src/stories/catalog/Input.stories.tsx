import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from '@moysklad/uikit';
import { Copy16Icon, Search16Icon } from '@moysklad/uikit/icon';
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
        <Input
          name="help"
          label="С подсказкой"
          placeholder="Наведите на значок"
          helpProps={{ popup: 'Подсказка к полю' }}
        />
        <Input name="size-l" label="Размер L" inputSize="L" placeholder="inputSize L" />
        <Input
          name="limit"
          label="Счётчик символов"
          placeholder="Не более 20"
          maxLength={20}
          showCounterLimit
        />
        <Input
          name="actions"
          label="Кнопки действий"
          placeholder="Текстовая и иконочная кнопки"
          textActionIcon="Вставить"
          onTextActionClick={() => setV('Вставлено')}
          trailingActionIcon={<Search16Icon />}
          onTrailingActionClick={() => {}}
        />
        <Input
          name="copy"
          label="Иконка справа"
          defaultValue="ABC-123"
          trailingActionIcon={<Copy16Icon />}
          onTrailingActionClick={() => {}}
        />
      </Col>
    );
  },
};
