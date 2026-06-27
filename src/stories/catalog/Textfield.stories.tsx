import type { Meta, StoryObj } from '@storybook/react';
import { Textfield } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Textfield',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 360 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={20} style={box}>
      <Textfield
        name="comment"
        label="Комментарий"
        placeholder="Введите текст…"
        limit={200}
        showCounterLimit={200}
        autoVerticalResize
      />
    </Col>
  ),
};
