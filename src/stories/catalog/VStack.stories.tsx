import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from '@moysklad/uikit';
import { Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Containers/VStack',
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

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Section title="VStack с size=s8">
      <VStack size="s8">
        <Box>Строка 1</Box>
        <Box>Строка 2</Box>
        <Box>Строка 3</Box>
      </VStack>
    </Section>
  ),
};
