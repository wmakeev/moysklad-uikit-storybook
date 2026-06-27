import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Sidepage,
  SidepageHeader,
  SidepageContent,
  SidepageFooter,
  Button,
  ButtonVariants,
  Text,
} from '@moysklad/uikit';
import { Row } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/Sidepage',
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
        <Button onClick={() => setOpen(true)}>Открыть боковую панель</Button>
        <Sidepage isOpen={open} onClose={() => setOpen(false)} width={420} withBackdrop>
          <SidepageHeader>
            <Text variant="heading3">Фильтры</Text>
          </SidepageHeader>
          <SidepageContent>
            <Text>Содержимое боковой панели — настройки, фильтры, детали записи.</Text>
          </SidepageContent>
          <SidepageFooter>
            <Row>
              <Button variant={ButtonVariants.SECONDARY} onClick={() => setOpen(false)}>
                Сбросить
              </Button>
              <Button onClick={() => setOpen(false)}>Применить</Button>
            </Row>
          </SidepageFooter>
        </Sidepage>
      </>
    );
  },
};
