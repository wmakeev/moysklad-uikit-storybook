import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HelpSize, Input, TextColor, TextVariant } from '@moysklad/uikit';
import { FieldLabel } from '@moysklad/uikit/components/FieldLabel';
import { FieldRow } from '@moysklad/uikit/components/FieldRow';
import { Col, Row, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/FieldLabel',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [name, setName] = useState('');
    const [overflow, setOverflow] = useState(false);
    return (
      <Col gap={24} style={box}>
        <Section title="Обычная и обязательная (required)">
          <Col gap={8}>
            <FieldLabel label="Наименование" />
            <FieldLabel label="Наименование" required />
          </Col>
        </Section>
        <Section title="С кнопкой помощи (helpProps)">
          <FieldLabel label="Себестоимость" helpProps={{ popup: 'Средневзвешенная себестоимость по всем складам.' }} />
        </Section>
        <Section title="Размер кнопки помощи (helpSize)">
          <Col gap={8}>
            {Object.entries(HelpSize).map(([key, size]) => (
              <FieldLabel
                key={size}
                label={`helpSize = ${key}`}
                helpSize={size}
                helpProps={{ popup: `Подсказка размера ${size}` }}
              />
            ))}
          </Col>
        </Section>
        <Section title="Стиль текста (variant)">
          <Col gap={8}>
            {Object.entries(TextVariant).map(([key, variant]) => (
              <FieldLabel key={variant} label={`variant = ${key}`} variant={variant} />
            ))}
          </Col>
        </Section>
        <Section title="Цвет текста (colorToken)">
          <Row gap={16}>
            {Object.entries(TextColor)
              .filter(([key]) => key !== 'invert')
              .map(([key, token]) => (
                <FieldLabel key={token} label={key} colorToken={token} />
              ))}
          </Row>
        </Section>
        <Section title="Узкий контейнер — обрезка и подсказка с полным текстом при наведении (onOverflowChange)">
          <Col gap={4}>
            <div style={{ width: 160 }}>
              <FieldLabel label="Основной склад отгрузки по умолчанию" onOverflowChange={setOverflow} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Текст обрезан: {overflow ? 'да' : 'нет'}
            </span>
          </Col>
        </Section>
        <Section title="Связь с полем (htmlFor) — клик по подписи ставит фокус в поле">
          <FieldRow>
            <FieldLabel label="Артикул" htmlFor="fl-sku" required />
            <Input id="fl-sku" name="fl-sku" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите значение" />
          </FieldRow>
        </Section>
      </Col>
    );
  },
};
