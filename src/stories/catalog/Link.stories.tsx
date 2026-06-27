import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Navigation/Link',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={10}>
      <Link href="#">Обычная ссылка</Link>
      <Link href="#" disabled>
        Неактивная ссылка
      </Link>
    </Col>
  ),
};
