import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, Button, ButtonVariants, Text } from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/Modal',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть модальное окно</Button>
        <Modal isVisible={open} onClose={() => setOpen(false)} maxWidth={480}>
          <Modal.Header>
            <Text variant="heading3">Удалить товар?</Text>
          </Modal.Header>
          <Modal.Body>
            <Text>Действие необратимо. Товар будет удалён из всех документов.</Text>
          </Modal.Body>
          <Modal.Footer>
            <Row>
              <Button variant={ButtonVariants.SECONDARY} onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button variant={ButtonVariants.ACCENT} onClick={() => setOpen(false)}>
                Удалить
              </Button>
            </Row>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
