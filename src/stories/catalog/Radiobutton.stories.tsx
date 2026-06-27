import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radiobutton } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Radiobutton',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [val, setVal] = useState('a');
    return (
      <Col gap={12}>
        {[
          { v: 'a', l: 'Вариант А' },
          { v: 'b', l: 'Вариант Б' },
          { v: 'c', l: 'Вариант В' },
        ].map(({ v, l }) => (
          <Radiobutton
            key={v}
            name="group"
            label={l}
            value={v}
            checked={val === v}
            onChange={() => setVal(v)}
          />
        ))}
      </Col>
    );
  },
};
