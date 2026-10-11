import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@moysklad/uikit';
import { FieldRow } from '@moysklad/uikit/components/FieldRow';
import { FieldLabel } from '@moysklad/uikit/components/FieldLabel';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/FieldRow',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={12} style={box}>
      <FieldRow>
        <FieldLabel label="Наименование" required />
        <Input name="fr-name" placeholder="Введите значение" />
      </FieldRow>
      <FieldRow>
        <FieldLabel label="Артикул" />
        <Input name="fr-sku" placeholder="—" />
      </FieldRow>
    </Col>
  ),
};
