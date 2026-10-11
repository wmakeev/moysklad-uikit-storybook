import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { EditableDate, ELanguages } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/EditableDate',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

// Фиксированная дата, чтобы история была детерминированной
const initialDate = () => new Date(2026, 5, 15, 14, 30);

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [date, setDate] = useState<Date | string>(initialDate());
    return (
      <Col gap={24} style={box}>
        <EditableDate
          // localeFormat — это локаль для Intl.DateTimeFormat (BCP-47), НЕ паттерн формата
          localeFormat={ELanguages.RU}
          lang={ELanguages.RU}
          selectedDate={date}
          onDateChanged={(d) => d && setDate(d)}
        />
      </Col>
    );
  },
};

export const ValueTypes: Story = {
  name: 'Значение: Date и строка',
  render: () => {
    const [date, setDate] = useState<Date | string>(initialDate());
    const [str, setStr] = useState<Date | string>('2026-06-15T14:30:00');
    return (
      <Col gap={24} style={box}>
        <Section title="selectedDate: Date">
          <EditableDate
            localeFormat={ELanguages.RU}
            lang={ELanguages.RU}
            selectedDate={date}
            onDateChanged={(d) => d && setDate(d)}
          />
        </Section>
        <Section title="selectedDate: строка">
          <EditableDate
            localeFormat={ELanguages.RU}
            lang={ELanguages.RU}
            selectedDate={str}
            onDateChanged={(d) => d && setStr(d)}
          />
        </Section>
      </Col>
    );
  },
};

export const PrefixAndIcon: Story = {
  name: 'prefix и iconPosition',
  render: () => {
    const [a, setA] = useState<Date | string>(initialDate());
    const [b, setB] = useState<Date | string>(initialDate());
    const [c, setC] = useState<Date | string>(initialDate());
    return (
      <Col gap={24} style={box}>
        <Section title="prefix по умолчанию («от»), иконка в конце">
          <EditableDate
            localeFormat={ELanguages.RU}
            lang={ELanguages.RU}
            selectedDate={a}
            onDateChanged={(d) => d && setA(d)}
          />
        </Section>
        <Section title='prefix="до"'>
          <EditableDate
            prefix="до"
            localeFormat={ELanguages.RU}
            lang={ELanguages.RU}
            selectedDate={b}
            onDateChanged={(d) => d && setB(d)}
          />
        </Section>
        <Section title='iconPosition="start"'>
          <EditableDate
            iconPosition="start"
            localeFormat={ELanguages.RU}
            lang={ELanguages.RU}
            selectedDate={c}
            onDateChanged={(d) => d && setC(d)}
          />
        </Section>
      </Col>
    );
  },
};

export const Disabled: Story = {
  name: 'Отключено',
  render: () => (
    <Col gap={24} style={box}>
      <EditableDate
        disabled
        localeFormat={ELanguages.RU}
        lang={ELanguages.RU}
        selectedDate={initialDate()}
        onDateChanged={() => {}}
      />
    </Col>
  ),
};

export const Presets: Story = {
  name: 'Пресеты',
  render: () => {
    const [date, setDate] = useState<Date | string>(initialDate());
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 3600 * 1000);
    return (
      <Col gap={24} style={box}>
        <EditableDate
          localeFormat={ELanguages.RU}
          lang={ELanguages.RU}
          selectedDate={date}
          presetsLabel="Быстрый выбор"
          presets={[
            { value: today, label: 'Сегодня' },
            { value: tomorrow, label: 'Завтра' },
          ]}
          onDateChanged={(d) => d && setDate(d)}
        />
      </Col>
    );
  },
};

export const Locales: Story = {
  name: 'Локали RU и EN',
  render: () => {
    const [ru, setRu] = useState<Date | string>(initialDate());
    const [en, setEn] = useState<Date | string>(initialDate());
    return (
      <Col gap={24} style={box}>
        <Section title="ELanguages.RU">
          <EditableDate
            localeFormat={ELanguages.RU}
            lang={ELanguages.RU}
            selectedDate={ru}
            onDateChanged={(d) => d && setRu(d)}
          />
        </Section>
        <Section title="ELanguages.EN">
          <EditableDate
            prefix="from"
            localeFormat={ELanguages.EN}
            lang={ELanguages.EN}
            selectedDate={en}
            onDateChanged={(d) => d && setEn(d)}
          />
        </Section>
      </Col>
    );
  },
};
