import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Banner',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={16} style={{ maxWidth: 520 }}>
      <Banner type="info" title="Информация" subtitle="Это информационный баннер с подсказкой." />
      <Banner type="warning" title="Внимание" subtitle="Что-то требует вашего внимания." onHide={() => {}} />
    </Col>
  ),
};
