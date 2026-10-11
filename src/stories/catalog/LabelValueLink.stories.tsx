import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabelValueLink } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValueLink',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [site, setSite] = useState('https://moysklad.ru');
    const [bare, setBare] = useState('moysklad.ru/pricing');
    const [empty, setEmpty] = useState('');
    const [custom, setCustom] = useState('');
    const [off, setOff] = useState('https://moysklad.ru');
    const [err, setErr] = useState('moysklad');
    return (
      <Col gap={24} style={box}>
        <Section title="Со ссылкой — карандаш открывает поле ввода" description="Нажмите на значение или на карандаш, чтобы изменить ссылку.">
          <LabelValueLink
            label="Сайт"
            name="lvl-site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="Введите адрес"
          />
        </Section>
        <Section title="Без протокола — при отображении подставляется https://">
          <LabelValueLink label="Страница" name="lvl-bare" value={bare} onChange={(e) => setBare(e.target.value)} />
        </Section>
        <Section title="Пусто — текст по умолчанию «Не указано»">
          <LabelValueLink label="Сайт" name="lvl-empty" value={empty} onChange={(e) => setEmpty(e.target.value)} />
        </Section>
        <Section title="Свой текст пустого значения (emptyText)">
          <LabelValueLink
            label="Профиль"
            name="lvl-custom"
            emptyText="Добавить ссылку"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        </Section>
        <Section title="Обязательное (required) и с подсказкой (helpPopupContent)">
          <LabelValueLink
            label="Сайт компании"
            name="lvl-req"
            required
            helpPopupContent="Укажите адрес сайта вместе с протоколом."
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
        </Section>
        <Section title="Недоступное (disabled)">
          <LabelValueLink label="Сайт" name="lvl-off" disabled value={off} onChange={(e) => setOff(e.target.value)} />
        </Section>
        <Section title="С ошибкой (error) и пояснением (info)" description="Пояснение показывается в поле ввода при редактировании: нажмите на значение.">
          <LabelValueLink
            label="Сайт"
            name="lvl-err"
            error
            info="Адрес должен содержать домен, например moysklad.ru"
            value={err}
            onChange={(e) => setErr(e.target.value)}
          />
        </Section>
      </Col>
    );
  },
};
