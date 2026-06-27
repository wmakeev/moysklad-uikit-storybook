import type { Meta, StoryObj } from '@storybook/react';
import { HStack, VStack, HStackSize } from '@moysklad/uikit';

const meta: Meta = {
  title: 'Компоненты/Containers/HStack',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const Box = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      minWidth: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      background: 'var(--product-blue-500)',
      color: '#fff',
      fontSize: 13,
      padding: '0 8px',
    }}
  >
    {children}
  </div>
);

const SIZES = ['s4', 's8', 's16', 's24', 's32'] as const;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <VStack size={HStackSize.s16}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <code style={{ width: 48, fontSize: 12, color: 'var(--text-tertiary)' }}>{size}</code>
          <HStack size={size}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </HStack>
        </div>
      ))}
    </VStack>
  ),
};
