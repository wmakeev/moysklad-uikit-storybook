import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextVariant, TextColor } from '@moysklad/uikit';

/**
 * Типографические стили. Базовый компонент — `Text` с пропом `variant`,
 * а также шорткаты `Text.H1`…`Text.Caption`.
 */

const VARIANTS: { variant: string; label: string }[] = [
  { variant: TextVariant.heading1, label: 'Heading 1 — H1' },
  { variant: TextVariant.heading2, label: 'Heading 2 — H2' },
  { variant: TextVariant.heading3, label: 'Heading 3 — H3' },
  { variant: TextVariant.heading4, label: 'Heading 4 — H4' },
  { variant: TextVariant.bodyXL, label: 'Body XL' },
  { variant: TextVariant.bodyL, label: 'Body L' },
  { variant: TextVariant.body, label: 'Body — основной текст' },
  { variant: TextVariant.bodyStrong, label: 'Body Strong — акцентный' },
  { variant: TextVariant.caption, label: 'Caption — подпись' },
];

const meta: Meta = {
  title: 'Токены/Типографика',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Шкала: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {VARIANTS.map(({ variant, label }) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <code
            style={{
              minWidth: 110,
              fontSize: 12,
              color: 'var(--text-tertiary)',
            }}
          >
            {variant}
          </code>
          {/* @ts-expect-error variant принимает строковый токен */}
          <Text variant={variant}>{label}</Text>
        </div>
      ))}
    </div>
  ),
};

export const Цвета: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Object.values(TextColor).map((color) => (
        <div
          key={color}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: color === 'invert' ? 'var(--invert-background)' : undefined,
            padding: color === 'invert' ? '6px 10px' : undefined,
            borderRadius: 6,
            width: 'fit-content',
          }}
        >
          <code style={{ minWidth: 90, fontSize: 12, color: 'var(--text-tertiary)' }}>
            {color}
          </code>
          <Text color={color}>Пример текста — {color}</Text>
        </div>
      ))}
    </div>
  ),
};
