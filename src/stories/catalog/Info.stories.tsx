import type { Meta, StoryObj } from '@storybook/react';
import { Info } from '@moysklad/uikit/components/Info';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Info',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Section title="Info — служебная подпись под полем">
      <Col gap={8}>
        <Info info="Обычная подсказка" />
        <Info info="Предупреждение" warning />
        <Info info="Ошибка валидации" error />
      </Col>
    </Section>
  ),
};
