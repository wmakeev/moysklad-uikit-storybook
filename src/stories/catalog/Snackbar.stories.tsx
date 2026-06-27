import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, useSnackbar, Button } from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/Snackbar',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const SnackbarTrigger = () => {
  const { showSnackbar } = useSnackbar();
  return (
    <Row>
      <Button onClick={() => showSnackbar({ message: 'Изменения сохранены' })}>
        Показать уведомление
      </Button>
    </Row>
  );
};

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Snackbar>
      <SnackbarTrigger />
    </Snackbar>
  ),
};
