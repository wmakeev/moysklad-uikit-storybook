import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabelValueCheckbox } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValueCheckbox',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [on, setOn] = useState(false);
    const [checked, setChecked] = useState(true);
    const [partial, setPartial] = useState(false);
    const [req, setReq] = useState(false);
    const [help, setHelp] = useState(true);
    const [long, setLong] = useState(false);
    return (
      <Col gap={24} style={box}>
        <Section title="Состояния: снят, отмечен, частично (indeterminate)">
          <Col gap={4}>
            <LabelValueCheckbox label="Не отмечен" checked={on} onChange={(e) => setOn((e.target as HTMLInputElement).checked)} />
            <LabelValueCheckbox label="Отмечен" checked={checked} onChange={(e) => setChecked((e.target as HTMLInputElement).checked)} />
            <LabelValueCheckbox label="Частично" indeterminate checked={partial} onChange={(e) => setPartial((e.target as HTMLInputElement).checked)} />
          </Col>
        </Section>
        <Section title="Неуправляемый (defaultChecked)">
          <LabelValueCheckbox label="Печатать копию" defaultChecked />
        </Section>
        <Section title="Недоступный (disabled)">
          <Col gap={4}>
            <LabelValueCheckbox label="Снят, недоступен" disabled checked={false} onChange={() => {}} />
            <LabelValueCheckbox label="Отмечен, недоступен" disabled checked onChange={() => {}} />
          </Col>
        </Section>
        <Section title="Обязательный (required)">
          <LabelValueCheckbox label="Согласен с условиями" required checked={req} onChange={(e) => setReq((e.target as HTMLInputElement).checked)} />
        </Section>
        <Section title="Подсказка (helpPopupContent)">
          <LabelValueCheckbox
            label="Учитывать НДС"
            helpPopupContent="Сумма документа будет посчитана с учётом НДС."
            checked={help}
            onChange={(e) => setHelp((e.target as HTMLInputElement).checked)}
          />
        </Section>
        <Section title="Длинная подпись">
          <LabelValueCheckbox
            label="Автоматически резервировать товар на складе при проведении заказа покупателя"
            checked={long}
            onChange={(e) => setLong((e.target as HTMLInputElement).checked)}
          />
        </Section>
      </Col>
    );
  },
};
