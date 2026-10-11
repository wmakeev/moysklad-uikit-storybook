import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Navigation/Breadcrumbs',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={24}>
      <Section title="Breadcrumbs">
        <Breadcrumbs>
          <Breadcrumbs.Item onClick={() => {}}>Главная</Breadcrumbs.Item>
          <Breadcrumbs.Item onClick={() => {}}>Товары</Breadcrumbs.Item>
          <Breadcrumbs.Item>Карточка товара</Breadcrumbs.Item>
        </Breadcrumbs>
      </Section>
      <Section title="Длинное название (charLimitThreshold, полный текст в подсказке)">
        <Breadcrumbs charLimitThreshold={20}>
          <Breadcrumbs.Item onClick={() => {}}>Главная</Breadcrumbs.Item>
          <Breadcrumbs.Item onClick={() => {}}>
            Очень длинное название раздела каталога товаров
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>Карточка товара</Breadcrumbs.Item>
        </Breadcrumbs>
      </Section>
    </Col>
  ),
};
