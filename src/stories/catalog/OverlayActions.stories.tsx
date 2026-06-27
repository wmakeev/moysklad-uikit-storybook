import type { Meta, StoryObj } from '@storybook/react';
import { OverlayActions, Text } from '@moysklad/uikit';
import { Edit16Icon, Delete16Icon, Copy16Icon } from '@moysklad/uikit/icon';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Overlays/OverlayActions',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={8}>
      <Text color="secondary">Наведите на блок — справа сверху появятся действия.</Text>
      <OverlayActions
        actions={[
          { id: 'edit', title: 'Редактировать', icon: Edit16Icon, onClick: () => {} },
          { id: 'copy', title: 'Копировать', icon: Copy16Icon, onClick: () => {} },
          { id: 'del', title: 'Удалить', icon: Delete16Icon, onClick: () => {} },
        ]}
      >
        <div
          style={{
            width: 280,
            height: 120,
            border: '1px solid var(--border-normal)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bgd-white)',
          }}
        >
          <Text color="tertiary">Карточка с действиями</Text>
        </div>
      </OverlayActions>
    </Col>
  ),
};
