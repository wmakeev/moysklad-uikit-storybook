import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Status/EmptyState',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const EMPTY_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect x="10" y="20" width="100" height="80" rx="8" fill="#f1f4f9" stroke="#d1d6df"/><line x1="28" y1="48" x2="92" y2="48" stroke="#d1d6df" stroke-width="4"/><line x1="28" y1="64" x2="72" y2="64" stroke="#d1d6df" stroke-width="4"/></svg>`,
  );

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <EmptyState
      title="Ничего не найдено"
      description="Попробуйте изменить параметры поиска или создать новую запись."
      imageSlot={<EmptyState.Image source={EMPTY_IMG} alt="Пусто" />}
      actionsSlot={
        <EmptyState.Actions centralButtonSlot={<EmptyState.Button>Создать</EmptyState.Button>} />
      }
    />
  ),
};
