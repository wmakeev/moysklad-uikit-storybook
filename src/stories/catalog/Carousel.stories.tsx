import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Carousel, Button } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Containers/Carousel',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const img = (color: string, label: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="${color}"/><text x="50%" y="50%" font-size="28" fill="#fff" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`,
  );

const IMAGES = [img('#2f8fff', '1'), img('#0d8a56', '2'), img('#db5202', '3')];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть галерею</Button>
        <Carousel
          sources={IMAGES}
          isVisible={open}
          onClose={() => setOpen(false)}
          alt="Изображение товара"
          toolbarLabel={(i, n) => `${i + 1} из ${n}`}
        />
      </>
    );
  },
};
