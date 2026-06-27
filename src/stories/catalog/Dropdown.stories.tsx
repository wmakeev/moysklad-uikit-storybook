import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { Dropdown, DropdownDivider, Button, ButtonVariants } from '@moysklad/uikit';
import { Edit16Icon, Delete16Icon, Copy16Icon } from '@moysklad/uikit/icon';

const meta: Meta = {
  title: 'Компоненты/Overlays/Dropdown',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const item = {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      padding: '8px 12px',
      cursor: 'pointer',
    } as const;
    return (
      <>
        <Button ref={triggerRef} variant={ButtonVariants.SECONDARY} onClick={() => setOpen((o) => !o)}>
          Меню действий
        </Button>
        <Dropdown open={open} onClose={() => setOpen(false)} triggerRef={triggerRef}>
          <div style={{ minWidth: 200, padding: '4px 0' }}>
            <div style={item} onClick={() => setOpen(false)}>
              <Edit16Icon /> Редактировать
            </div>
            <div style={item} onClick={() => setOpen(false)}>
              <Copy16Icon /> Дублировать
            </div>
            <DropdownDivider />
            <div style={{ ...item, color: 'var(--text-critical)' }} onClick={() => setOpen(false)}>
              <Delete16Icon /> Удалить
            </div>
          </div>
        </Dropdown>
      </>
    );
  },
};
