import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Multiselect } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Multiselect',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const MS_ITEMS = [
  { value: 'red', label: 'Красный' },
  { value: 'green', label: 'Зелёный' },
  { value: 'blue', label: 'Синий' },
  { value: 'black', label: 'Чёрный' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [values, setValues] = useState<string[]>(['red']);
    const [allFull, setAllFull] = useState<string[]>(MS_ITEMS.map((i) => i.value));
    const [allShort, setAllShort] = useState<string[]>(MS_ITEMS.map((i) => i.value));
    return (
      <Col gap={24} style={box}>
        <Multiselect<string>
          label="Цвета"
          items={MS_ITEMS}
          values={values}
          onChange={setValues}
          placeholder="Выберите цвета"
          getOtherText={(n) => `+${n}`}
          showSelectAllCheckbox
        />
        <Multiselect<string>
          label="Выбраны все, allSelectedChipTextVariant: full"
          items={MS_ITEMS}
          values={allFull}
          onChange={setAllFull}
          placeholder="Выберите цвета"
          showSelectAllCheckbox
          allSelectedChipTextVariant="full"
        />
        <Multiselect<string>
          label="Выбраны все, allSelectedChipTextVariant: short"
          items={MS_ITEMS}
          values={allShort}
          onChange={setAllShort}
          placeholder="Выберите цвета"
          showSelectAllCheckbox
          allSelectedChipTextVariant="short"
        />
      </Col>
    );
  },
};
