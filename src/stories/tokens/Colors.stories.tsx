import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '../../shared/Showcase';

/**
 * Цветовые токены дизайн-системы. Значения читаются из CSS-переменных,
 * подключённых через `@moysklad/uikit/colorVariables.css`.
 */

type Token = { name: string; comment?: string };

const Swatch = ({ name }: Token) => {
  const value = `var(${name})`;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 150,
        border: '1px solid var(--border-normal)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--bgd-white)',
      }}
    >
      <div style={{ height: 56, background: value }} />
      <div style={{ padding: '6px 8px' }}>
        <code style={{ fontSize: 11, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
          {name}
        </code>
      </div>
    </div>
  );
};

const Group = ({ title, tokens }: { title: string; tokens: string[] }) => (
  <Section title={title}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {tokens.map((t) => (
        <Swatch key={t} name={t} />
      ))}
    </div>
  </Section>
);

const TEXT = [
  '--text-primary',
  '--text-secondary',
  '--text-tertiary',
  '--text-accent',
  '--text-positive',
  '--text-critical',
  '--text-attention',
];

const BG = ['--bgd-white', '--bgd-grey', '--bgd-secondary', '--bgd-overlay', '--bgd-accent'];

const BUTTONS = [
  '--button-primary-normal',
  '--button-primary-hover',
  '--button-primary-focus',
  '--button-primary-pressed',
  '--button-primary-disabled',
  '--button-secondary-normal',
  '--button-secondary-hover',
  '--button-secondary-pressed',
];

const BORDERS = [
  '--border-normal',
  '--border-hover',
  '--border-disable',
  '--border-accent',
  '--border-critical',
  '--border-focused',
];

const ELEMENTS = [
  '--elements-normal',
  '--elements-hover',
  '--elements-accent',
  '--elements-positive',
  '--elements-critical',
  '--elements-attention',
];

const BADGES = [
  '--badge-green-bgd',
  '--badge-orange-bgd',
  '--badge-red-bgd',
  '--badge-grey-bgd',
  '--badge-purple-bgd',
  '--badge-blue-bgd',
];

const PALETTE = [
  '--product-blue-500',
  '--product-blue-700',
  '--colorful-red-600',
  '--colorful-green-600',
  '--colorful-orange-600',
  '--colorful-purple-600',
  '--light-grey-100',
  '--light-grey-400',
  '--dark-grey-dark-900',
  '--light-blue-50',
];

const GWT_STATUS = [
  '--gwt-statuses-grey',
  '--gwt-statuses-red',
  '--gwt-statuses-orange',
  '--gwt-statuses-brown',
  '--gwt-statuses-yellow-green',
  '--gwt-statuses-lime-green',
  '--gwt-statuses-mint-green',
  '--gwt-statuses-green',
  '--gwt-statuses-sky-blue',
  '--gwt-statuses-blue',
  '--gwt-statuses-dusty-blue',
  '--gwt-statuses-dark-blue',
  '--gwt-statuses-pink',
  '--gwt-statuses-violet',
  '--gwt-statuses-dark-red',
  '--gwt-statuses-black',
];

const VIEWERS_STACK = [
  '--viewers-stack-green',
  '--viewers-stack-yellow',
  '--viewers-stack-pink',
  '--viewers-stack-violet',
];

const meta: Meta = {
  title: 'Токены/Цвета',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

export const Семантические: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Group title="Текст" tokens={TEXT} />
      <Group title="Фоны" tokens={BG} />
      <Group title="Кнопки" tokens={BUTTONS} />
      <Group title="Границы" tokens={BORDERS} />
      <Group title="Элементы" tokens={ELEMENTS} />
      <Group title="Бейджи (фон)" tokens={BADGES} />
      <Group title="Цвета статусов (gwt-status)" tokens={GWT_STATUS} />
      <Group title="Аватары наблюдателей (viewers-stack)" tokens={VIEWERS_STACK} />
    </div>
  ),
};

export const Палитра: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Group title="Базовая палитра" tokens={PALETTE} />
    </div>
  ),
};
