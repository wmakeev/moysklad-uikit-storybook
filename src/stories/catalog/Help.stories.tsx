import type { Meta, StoryObj } from '@storybook/react';
import { Help, HelpSize, Text } from '@moysklad/uikit';
import { Col, Row, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/Help',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={24}>
      <Section title="Help — иконка с поясняющим попапом">
        <Row>
          <Text>Себестоимость</Text>
          <Help popup="Средневзвешенная себестоимость по всем складам." />
        </Row>
      </Section>
      <Section title="Размеры (size)">
        <Row gap={24}>
          {Object.entries(HelpSize).map(([name, size]) => (
            <Row key={size} gap={6}>
              <Text>{name}</Text>
              <Help size={size} popup={`Подсказка размера ${size}`} />
            </Row>
          ))}
        </Row>
      </Section>
      <Section title="Неактивная (disabled)">
        <Row>
          <Text>Скидка</Text>
          <Help disabled popup="Недоступно." />
        </Row>
      </Section>
    </Col>
  ),
};
