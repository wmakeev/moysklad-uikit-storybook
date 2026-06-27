import type { Meta, StoryObj } from '@storybook/react';
import { Dot, DotColor, DotVariant } from '@moysklad/uikit';
import { Row, Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Dot',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={20}>
      <Section title="Цвета">
        <Row>
          {Object.values(DotColor).map((color) => (
            <Dot key={color} color={color} />
          ))}
        </Row>
      </Section>
      <Section title="С числом">
        <Row>
          <Dot variant={DotVariant.NUMBER} value={3} color={DotColor.RED} />
          <Dot variant={DotVariant.NUMBER} value={42} max={99} color={DotColor.BLUE} />
          <Dot variant={DotVariant.NUMBER} value={150} max={99} color={DotColor.GREEN} />
        </Row>
      </Section>
    </Col>
  ),
};
