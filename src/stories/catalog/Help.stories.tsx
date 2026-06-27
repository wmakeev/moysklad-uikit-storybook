import type { Meta, StoryObj } from '@storybook/react';
import { Help, Text } from '@moysklad/uikit';
import { InformationCircle16Icon } from '@moysklad/uikit/icon';
import { Row, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/Help',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Section title="Help — иконка с поясняющим попапом">
      <Row>
        <Text>Себестоимость</Text>
        <Help popup="Средневзвешенная себестоимость по всем складам." icon={<InformationCircle16Icon />} />
      </Row>
    </Section>
  ),
};
