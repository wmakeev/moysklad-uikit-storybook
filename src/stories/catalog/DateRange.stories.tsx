import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  DateRange,
  LocaleContextProvider,
  ELanguages,
  type DateRangeValue,
  type DateRangeProps,
} from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/DateRange',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const day = (offset: number) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d;
};

/** Controlled-обёртка: хранит DateRangeValue, остальные пропы пробрасываются. */
const Controlled = ({
  initial,
  ...props
}: { initial: DateRangeValue } & Omit<DateRangeProps, 'value' | 'onChange'>) => {
  const [value, setValue] = useState<DateRangeValue>(initial);
  return <DateRange {...props} value={value} onChange={setValue} />;
};

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={24} style={box}>
      <Controlled
        label="Период"
        initial={{ type: 'period', value: [day(-7), day(0)] }}
      />
    </Col>
  ),
};

export const ValueTypes: Story = {
  name: 'Шесть типов значения',
  render: () => (
    <Col gap={24} style={box}>
      <Controlled label="period" initial={{ type: 'period', value: [day(-7), day(0)] }} />
      <Controlled label="day" initial={{ type: 'day', value: day(0) }} />
      <Controlled label="week" initial={{ type: 'week', value: [day(-6), day(0)] }} />
      <Controlled label="month" initial={{ type: 'month', value: [day(-29), day(0)] }} />
      <Controlled label="anyDate" initial={{ type: 'anyDate', value: null }} />
      <Controlled label="noDate" initial={{ type: 'noDate', value: null }} />
    </Col>
  ),
};

export const Limits: Story = {
  name: 'Ограничения minDate / maxDate',
  render: () => (
    <Col gap={24} style={box}>
      <Controlled
        label="Только последние 30 дней"
        minDate={day(-30)}
        maxDate={day(0)}
        initial={{ type: 'period', value: [day(-7), day(0)] }}
      />
      <Controlled
        label="Дата обязательна"
        requiredDate
        initial={{ type: 'day', value: day(0) }}
      />
    </Col>
  ),
};

export const Features: Story = {
  name: 'Флаги возможностей и quickFilter',
  render: () => (
    <Col gap={24} style={box}>
      <Section title="withPeriod={false}">
        <Controlled
          label="Без периода"
          withPeriod={false}
          initial={{ type: 'day', value: day(0) }}
        />
      </Section>
      <Section title="withAnyDate={false} withNoDate={false}">
        <Controlled
          label="Без «любая дата» и «нет даты»"
          withAnyDate={false}
          withNoDate={false}
          initial={{ type: 'period', value: [day(-7), day(0)] }}
        />
      </Section>
      <Section title="withTimeSelection={false} withClearButton={false}">
        <Controlled
          label="Без времени и очистки"
          withTimeSelection={false}
          withClearButton={false}
          initial={{ type: 'period', value: [day(-7), day(0)] }}
        />
      </Section>
      <Section title="quickFilter=['yesterday', 'today', 'tomorrow']">
        <Controlled
          label="Быстрые фильтры дня"
          quickFilter={['yesterday', 'today', 'tomorrow']}
          initial={{ type: 'day', value: day(0) }}
        />
      </Section>
    </Col>
  ),
};

export const States: Story = {
  name: 'Состояния',
  render: () => (
    <Col gap={24} style={box}>
      <Controlled label="error" error initial={{ type: 'period', value: [day(-7), day(0)] }} />
      <Controlled
        label="disabled"
        disabled
        initial={{ type: 'period', value: [day(-7), day(0)] }}
      />
    </Col>
  ),
};

export const EnglishLocale: Story = {
  name: 'Английская локаль',
  render: () => (
    <LocaleContextProvider lang={ELanguages.EN} locale={ELanguages.EN}>
      <Col gap={24} style={box}>
        <Controlled
          label="Period"
          initial={{ type: 'period', value: [day(-7), day(0)] }}
        />
      </Col>
    </LocaleContextProvider>
  ),
};

export const CustomInput: Story = {
  name: 'Свой renderInput',
  render: () => (
    <Col gap={24} style={box}>
      <Controlled
        label="Период"
        initial={{ type: 'period', value: [day(-7), day(0)] }}
        renderInput={({ triggerRef, triggerAriaProps, onOpen, onKeyDown, displayValue, disabled }) => (
          <button
            ref={triggerRef as React.MutableRefObject<HTMLButtonElement | null>}
            type="button"
            {...triggerAriaProps}
            disabled={disabled}
            onClick={onOpen}
            onKeyDown={onKeyDown}
            style={{
              padding: '6px 12px',
              border: '1px solid var(--border-primary, #ccc)',
              borderRadius: 6,
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {displayValue || 'Выберите период'}
          </button>
        )}
      />
    </Col>
  ),
};
