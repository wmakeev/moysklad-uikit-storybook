import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  StatusBadge,
  StatusBadgeSize,
  StatusColor,
  type StatusBadgeOption,
} from '@moysklad/uikit';
import { Col, Row, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/StatusBadge',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const statuses: StatusBadgeOption[] = [
  { label: 'Новый', value: 'new', color: StatusColor.Blue },
  { label: 'В работе', value: 'work', color: StatusColor.Orange },
  { label: 'Выполнен', value: 'done', color: StatusColor.Green },
  { label: 'Отменён', value: 'cancel', color: StatusColor.Red },
];

const allColors: StatusBadgeOption[] = Object.entries(StatusColor).map(([name, color]) => ({
  label: name,
  value: color,
  color,
}));

const Controlled = ({
  size,
  disabled,
  title = 'Статус',
  options = statuses,
  initial = statuses[0],
  dropdownButtonText,
}: {
  size?: (typeof StatusBadgeSize)[keyof typeof StatusBadgeSize];
  disabled?: boolean;
  title?: string;
  options?: StatusBadgeOption[];
  initial?: StatusBadgeOption | undefined;
  dropdownButtonText?: string;
}) => {
  const [value, setValue] = useState<StatusBadgeOption | undefined>(initial);
  return (
    <StatusBadge
      title={title}
      size={size}
      disabled={disabled}
      availableStatuses={options}
      value={value}
      onSelect={setValue}
      dropdownButtonText={dropdownButtonText}
      onDropdownButtonClick={() => {}}
    />
  );
};

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={8}>
      <Section title="Выбор статуса" description="Нажмите, чтобы открыть список статусов; без value цвет empty">
        <Row>
          <Controlled />
          <Controlled initial={undefined} title="Без значения" />
        </Row>
      </Section>
      <Section title="Все 17 цветов" description="StatusColor; у empty токена нет">
        <Row>
          {allColors.map(o => (
            <StatusBadge
              key={o.color}
              title={o.label as string}
              value={o}
              availableStatuses={allColors}
            />
          ))}
        </Row>
      </Section>
      <Section title="Размеры" description="Comfortable (по умолчанию) и Compact">
        <Row>
          <Controlled size={StatusBadgeSize.Comfortable} title="Comfortable" />
          <Controlled size={StatusBadgeSize.Compact} title="Compact" />
        </Row>
      </Section>
      <Section title="disabled" description="Стрелка скрыта, список не открывается">
        <Controlled disabled title="Недоступен" />
      </Section>
      <Section title="Длинный заголовок" description="При переполнении появляется подсказка">
        <div style={{ maxWidth: 200 }}>
          <Controlled title="Очень длинный заголовок статуса документа, не помещающийся в ширину" />
        </div>
      </Section>
      <Section title="Пустой availableStatuses" description="В списке только кнопка настройки">
        <Controlled options={[]} initial={undefined} title="Нет статусов" dropdownButtonText="Добавить статус" />
      </Section>
    </Col>
  ),
};
