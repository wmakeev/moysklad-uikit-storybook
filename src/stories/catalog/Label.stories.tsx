import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@moysklad/uikit';
import { FieldRow } from '@moysklad/uikit/components/FieldRow';
import { Label } from '@moysklad/uikit/components/Label';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Label',
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
        <Label label="Наименование" required />
        <Input name="lbl-name" placeholder="Введите значение" />
      </FieldRow>
      <FieldRow>
        <Label label="Артикул" />
        <Input name="lbl-sku" placeholder="—" />
      </FieldRow>
    </Col>
  ),
};
