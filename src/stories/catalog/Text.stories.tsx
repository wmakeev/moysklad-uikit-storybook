import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextVariant, TextColor } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Typography/Text',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const VARIANTS: { variant: string; label: string }[] = [
  { variant: TextVariant.heading1, label: 'Heading 1 — H1' },
  { variant: TextVariant.heading2, label: 'Heading 2 — H2' },
  { variant: TextVariant.heading3, label: 'Heading 3 — H3' },
  { variant: TextVariant.heading4, label: 'Heading 4 — H4' },
  { variant: TextVariant.bodyL, label: 'Body L' },
  { variant: TextVariant.body, label: 'Body — основной текст' },
  { variant: TextVariant.bodyStrong, label: 'Body Strong — акцентный' },
  { variant: TextVariant.caption, label: 'Caption — подпись' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={24}>
      <Section title="Варианты">
        <Col gap={14}>
          {VARIANTS.map(({ variant, label }) => (
            <div key={variant} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <code style={{ minWidth: 110, fontSize: 12, color: 'var(--text-tertiary)' }}>
                {variant}
              </code>
              {/* @ts-expect-error variant принимает строковый токен */}
              <Text variant={variant}>{label}</Text>
            </div>
          ))}
        </Col>
      </Section>
      <Section title="Цвета">
        <Col gap={8}>
          <Text color={TextColor.primary}>primary — основной</Text>
          <Text color={TextColor.secondary}>secondary — второстепенный</Text>
          <Text color={TextColor.accent}>accent — акцентный</Text>
          <Text color={TextColor.critical}>critical — критический</Text>
        </Col>
      </Section>
    </Col>
  ),
};
