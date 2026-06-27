import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@moysklad/uikit/icon';
import { Input } from '@moysklad/uikit';

/**
 * Полная галерея иконок (~306 шт.) в размерах 12 / 16 / 20px.
 * Импорт: `import { Check20Icon } from '@moysklad/uikit/icon';`
 */

type IconComponent = (props: { stroke?: string; className?: string }) => JSX.Element;

const ALL = Object.entries(Icons)
  .filter(([name]) => name.endsWith('Icon'))
  .sort(([a], [b]) => a.localeCompare(b)) as [string, IconComponent][];

const Gallery = () => {
  const [query, setQuery] = useState('');
  const filtered = ALL.filter(([name]) =>
    name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div style={{ maxWidth: 320, marginBottom: 20 }}>
        <Input
          name="icon-search"
          placeholder="Поиск иконки…"
          value={query}
          clearable
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery('')}
        />
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        Найдено: {filtered.length} из {ALL.length}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 8,
        }}
      >
        {filtered.map(([name, Icon]) => (
          <div
            key={name}
            title={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '12px 6px',
              border: '1px solid var(--border-disable)',
              borderRadius: 8,
              background: 'var(--bgd-white)',
            }}
          >
            <div
              style={{
                height: 24,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--elements-normal)',
              }}
            >
              <Icon />
            </div>
            <code
              style={{
                fontSize: 10,
                color: 'var(--text-secondary)',
                textAlign: 'center',
                wordBreak: 'break-all',
                lineHeight: 1.3,
              }}
            >
              {name}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Токены/Иконки',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

export const Галерея: Story = {
  render: () => <Gallery />,
};
