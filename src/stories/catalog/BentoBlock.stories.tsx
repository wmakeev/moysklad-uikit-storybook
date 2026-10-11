import type { Meta, StoryObj } from '@storybook/react';
import { BentoBlock, BentoBlockPaddingVariant, BentoBlockTag, Text, TextVariant } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Containers/BentoBlock',
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--bgd-secondary)', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj;

const PADDINGS = [
  BentoBlockPaddingVariant.P12,
  BentoBlockPaddingVariant.P16,
  BentoBlockPaddingVariant.P20,
] as const;

const LONG_ROWS = Array.from({ length: 12 }, (_, i) => `Строка списка ${i + 1}`);

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={8}>
      <Section title="paddingVariant" description="Три размера внутреннего отступа: p12, p16, p20 (по умолчанию).">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PADDINGS.map((p) => (
            <BentoBlock key={p} paddingVariant={p}>
              <Text variant={TextVariant.bodyStrong}>{p}</Text>
              <Text variant={TextVariant.body}>Блок с отступом {p}</Text>
            </BentoBlock>
          ))}
        </div>
      </Section>

      <Section title="as" description="Семантический тег корневого элемента: div, section, article, aside, header, footer, nav.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {Object.values(BentoBlockTag).map((tag) => (
            <BentoBlock key={tag} as={tag} paddingVariant="p12">
              <Text variant={TextVariant.bodyStrong}>{`<${tag}>`}</Text>
            </BentoBlock>
          ))}
        </div>
      </Section>

      <Section
        title="Прокрутка содержимого"
        description="className и style уходят во внутренний scroll-контейнер: высота у него ограничена, содержимое прокручивается внутри блока."
      >
        <BentoBlock style={{ maxHeight: 140 }}>
          {LONG_ROWS.map((row) => (
            <Text key={row} variant={TextVariant.body}>
              {row}
            </Text>
          ))}
        </BentoBlock>
      </Section>

      <Section title="Сетка блоков" description="Несколько блоков в CSS-сетке на сером фоне страницы.">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <BentoBlock as="section">
            <Text variant={TextVariant.heading4}>Основной блок</Text>
            <Text variant={TextVariant.body}>Контент карточки заказа.</Text>
          </BentoBlock>
          <Col gap={20}>
            <BentoBlock as="aside" paddingVariant="p16">
              <Text variant={TextVariant.bodyStrong}>Боковой блок</Text>
            </BentoBlock>
            <BentoBlock as="aside" paddingVariant="p16">
              <Text variant={TextVariant.bodyStrong}>Ещё один</Text>
            </BentoBlock>
          </Col>
        </div>
      </Section>
    </Col>
  ),
};
