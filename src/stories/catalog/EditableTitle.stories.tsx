import type { Meta, StoryObj } from '@storybook/react';
import { EditableTitle } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Forms/EditableTitle',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <EditableTitle
      defaultValue="Заголовок, который можно изменить"
      titleComponent="H2"
      onApplyValidValue={() => {}}
      maxLength={80}
    />
  ),
};
