import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BottomSheet, BottomSheetContextProvider, Button, Text } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Overlays/BottomSheet',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [open, setOpen] = useState(false);
    // BottomSheet порталится в root из BottomSheetContextProvider — без него не откроется
    return (
      <BottomSheetContextProvider>
        <Button onClick={() => setOpen(true)}>Открыть BottomSheet</Button>
        <BottomSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Действия"
          description="Выберите действие с записью"
          closable
          contentSlot={<Text>Контент шторки снизу (для мобильных сценариев).</Text>}
          actionsSlot={
            <Button stretch onClick={() => setOpen(false)}>
              Готово
            </Button>
          }
        />
      </BottomSheetContextProvider>
    );
  },
};
