import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@moysklad/uikit';
import { Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Navigation/Breadcrumbs',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Section title="Breadcrumbs">
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={() => {}}>Главная</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => {}}>Товары</Breadcrumbs.Item>
        <Breadcrumbs.Item>Карточка товара</Breadcrumbs.Item>
      </Breadcrumbs>
    </Section>
  ),
};
