import type { Meta, StoryObj } from '@storybook/react';
import { Indicator } from '@moysklad/uikit/components/Indicator';
import { Row, Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Indicator',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const cap = { fontSize: 11, color: 'var(--text-tertiary)' } as const;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Section title="Indicator — режимы индикатора (используется в чекбоксах, табах, чипах)">
      <Row gap={32}>
        <Col gap={6} style={{ alignItems: 'center' }}>
          <Indicator indicator={{ mode: 'count', count: 8 }} />
          <code style={cap}>count</code>
        </Col>
        <Col gap={6} style={{ alignItems: 'center' }}>
          <Indicator indicator={{ mode: 'countDot', count: 8 }} />
          <code style={cap}>countDot</code>
        </Col>
        <Col gap={6} style={{ alignItems: 'center' }}>
          <Indicator indicator={{ mode: 'noveltyDot' }} />
          <code style={cap}>noveltyDot</code>
        </Col>
        <Col gap={6} style={{ alignItems: 'center' }}>
          <Indicator indicator={{ mode: 'noveltyNumber', count: 3 }} />
          <code style={cap}>noveltyNumber</code>
        </Col>
      </Row>
    </Section>
  ),
};
