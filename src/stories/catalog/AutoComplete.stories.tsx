import type { Meta, StoryObj } from '@storybook/react';
import { useState, type Ref } from 'react';
import { AutoComplete, Input, Text, type ISelectOption } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/AutoComplete',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const FRUITS: ISelectOption<string>[] = [
  { value: 'apple', label: 'Яблоко' },
  { value: 'banana', label: 'Банан' },
  { value: 'cherry', label: 'Вишня' },
  { value: 'grape', label: 'Виноград' },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [text, setText] = useState('');
    const [picked, setPicked] = useState('');
    const options = FRUITS.filter((o) =>
      o.label.toLowerCase().includes(text.toLowerCase()),
    );
    return (
      <Col gap={8} style={box}>
        <AutoComplete
          label="Фрукт"
          options={text ? options : null}
          onSelectOption={(o) => {
            setPicked(o.label);
            setText(o.label);
          }}
          renderInput={({ inputId, ref, onChange, onOpen }) => (
            <Input
              // дженерик R у AutoComplete не выводится в HTMLInputElement → приводим ref
              ref={ref as Ref<HTMLInputElement>}
              id={inputId}
              name="ac"
              value={text}
              placeholder="Начните вводить…"
              onFocus={onOpen}
              onChange={(e) => {
                setText(e.target.value);
                onChange?.();
              }}
            />
          )}
        />
        <Text color="tertiary">Выбрано: {picked || '—'}</Text>
      </Col>
    );
  },
};
