import type { Meta, StoryObj } from '@storybook/react';
import { EmptyStateLarge } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Status/EmptyStateLarge',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const EMPTY_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><circle cx="90" cy="90" r="70" fill="#f1f4f9"/><path d="M60 90h60M90 60v60" stroke="#a0c8ff" stroke-width="8" stroke-linecap="round"/></svg>`,
  );

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <EmptyStateLarge
      title="Здесь пока ничего нет"
      description="Создайте первый документ, чтобы начать работу с разделом."
      imageSlot={<EmptyStateLarge.Image source={EMPTY_IMG} alt="Пусто" />}
      actionsSlot={
        <EmptyStateLarge.Actions
          leftButtonSlot={<EmptyStateLarge.Button variant="blue">Создать документ</EmptyStateLarge.Button>}
          rightButtonSlot={<EmptyStateLarge.Button variant="green">Импортировать</EmptyStateLarge.Button>}
        />
      }
      linksSlot={
        <EmptyStateLarge.Links>
          <EmptyStateLarge.Link href="#">Как это работает?</EmptyStateLarge.Link>
        </EmptyStateLarge.Links>
      }
    />
  ),
};
