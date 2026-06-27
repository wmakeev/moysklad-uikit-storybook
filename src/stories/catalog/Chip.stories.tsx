import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Chip } from '@moysklad/uikit';
import { Row, Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Actions/Chip',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [selected, setSelected] = useState<Record<string, boolean>>({
      new: true,
      sale: false,
      hit: false,
    });
    const toggle = (key: string) => (next: boolean) =>
      setSelected((s) => ({ ...s, [key]: next }));
    return (
      <Col gap={24}>
        <Section title="Выбор (новое API)">
          <Row>
            <Chip label="Новинка" selected={selected.new} onSelectedChange={toggle('new')} />
            <Chip label="Распродажа" selected={selected.sale} onSelectedChange={toggle('sale')} />
            <Chip label="Хит" selected={selected.hit} onSelectedChange={toggle('hit')} />
          </Row>
        </Section>
        <Section title="Варианты">
          <Row>
            <Chip label="Regular" variant="regular" selected={false} onSelectedChange={() => {}} />
            <Chip label="Warning" variant="warning" selected={false} onSelectedChange={() => {}} />
            <Chip label="Critical" variant="critical" selected={false} onSelectedChange={() => {}} />
          </Row>
        </Section>
        <Section title="Удаляемый">
          <Row>
            <Chip
              label="Тег с удалением"
              selected={false}
              onSelectedChange={() => {}}
              clearable
              onClear={() => {}}
            />
          </Row>
        </Section>
      </Col>
    );
  },
};
