import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Navigation/Pagination',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [page, setPage] = useState(1);
    const total = 5;
    return (
      <Pagination
        label={`${page} из ${total}`}
        onFirst={() => setPage(1)}
        onLast={() => setPage(total)}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(total, p + 1))}
        isGoBackDisabled={page === 1}
        isGoForwardDisabled={page === total}
      />
    );
  },
};
