import type { Meta, StoryObj } from '@storybook/react';
import { Informer, InformerVariant } from '@moysklad/uikit';
import { InformationCircle16Icon } from '@moysklad/uikit/icon';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Informer',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={8} style={{ maxWidth: 520 }}>
      <Section title="Цвета" description="variant: blue (по умолчанию), green, red">
        <Col gap={12}>
          <Informer variant={InformerVariant.blue} description="Синий вариант по умолчанию." />
          <Informer variant={InformerVariant.green} description="Зелёный вариант: всё в порядке." />
          <Informer variant={InformerVariant.red} description="Красный вариант: есть ограничение." />
        </Col>
      </Section>
      <Section title="С заголовком и без">
        <Col gap={12}>
          <Informer description="Только описание, без заголовка." />
          <Informer title="Заголовок" description="Описание под заголовком." />
        </Col>
      </Section>
      <Section title="renderTitle" description="Кастомный заголовок с иконкой">
        <Informer
          variant={InformerVariant.green}
          title="Заголовок с иконкой"
          description="Заголовок отрисован через renderTitle."
          renderTitle={({ title }) => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
              <InformationCircle16Icon />
              {title}
            </span>
          )}
        />
      </Section>
      <Section title="Длинное описание" description="Рекомендуемый предел — 4 строки">
        <Informer
          title="Длинный текст"
          description="Информер расширяется по ширине родителя, а длинный текст переносится на несколько строк. Текст должен быть кратким: если сообщение занимает больше четырёх строк, стоит согласовать с дизайнером другой компонент."
        />
      </Section>
    </Col>
  ),
};
