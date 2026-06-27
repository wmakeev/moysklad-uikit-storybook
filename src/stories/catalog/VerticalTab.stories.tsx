import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { VerticalTab, VerticalTabGroup } from '@moysklad/uikit';
import { Customers16Icon, Archive16Icon } from '@moysklad/uikit/icon';

const meta: Meta = {
  title: 'Компоненты/Navigation/VerticalTab',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [value, setValue] = useState<string | number>('general');
    return (
      <div style={{ maxWidth: 280 }}>
        <VerticalTabGroup value={value} onChange={setValue} aria-label="Настройки">
          <VerticalTab value="general" title="Основное" description="Имя, описание" icon={<Customers16Icon />} />
          <VerticalTab value="access" title="Доступ" description="Права и роли" counter={{ value: 3 }} />
          <VerticalTab value="archive" title="Архив" icon={<Archive16Icon />} titleDot />
          <VerticalTab value="disabled" title="Недоступно" isDisabled />
        </VerticalTabGroup>
      </div>
    );
  },
};
