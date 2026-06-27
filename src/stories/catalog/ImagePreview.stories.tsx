import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@moysklad/uikit';
import { ImagePreview } from '@moysklad/uikit/components/ImagePreview';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Containers/ImagePreview',
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
  render: () => (
    <Col gap={8}>
      <Text color="secondary">Наведите на миниатюру — появится увеличенное превью.</Text>
      <ImagePreview src={IMAGES[0]} alt="Превью">
        <img src={IMAGES[0]} alt="thumb" style={{ width: 64, height: 48, borderRadius: 6, objectFit: 'cover' }} />
      </ImagePreview>
    </Col>
  ),
};
