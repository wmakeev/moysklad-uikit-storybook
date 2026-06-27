import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Listing } from '@moysklad/uikit';
import { Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Containers/Listing',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [current, setCurrent] = useState(1);
    const total = 12;
    return (
      <Section title="Listing — навигация «N из M»">
        <Listing
          current={current}
          total={total}
          onPrev={() => setCurrent((c) => Math.max(1, c - 1))}
          onNext={() => setCurrent((c) => Math.min(total, c + 1))}
          isPrevDisabled={current === 1}
          isNextDisabled={current === total}
          withDivider
        />
      </Section>
    );
  },
};
