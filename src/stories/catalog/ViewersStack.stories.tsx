import type { Meta, StoryObj } from '@storybook/react';
import { ViewersStack } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/ViewersStack',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const avatar = (bg: string, letter: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="${bg}"/><text x="20" y="26" font-size="18" text-anchor="middle" fill="#fff" font-family="sans-serif">${letter}</text></svg>`,
  )}`;

const people = [
  { id: 'u1', label: 'Анна Иванова' },
  { id: 'u2', label: 'Борис Петров' },
  { id: 'u3', label: 'Виктор Сидоров' },
  { id: 'u4', label: 'Галина Орлова' },
  { id: 'u5', label: 'Дмитрий Фёдоров' },
  { id: 'u6', label: 'Елена Смирнова' },
];

const withImages = [
  { id: 'i1', label: 'Анна Иванова', image: avatar('#2e7d32', 'А') },
  { id: 'i2', label: 'Борис Петров', image: avatar('#1565c0', 'Б') },
  { id: 'i3', label: 'Виктор Сидоров', image: avatar('#6a1b9a', 'В') },
];

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={8}>
      <Section title="1, 2 и 3 зрителя" description="Наведите на аватар, чтобы увидеть имя">
        <Col gap={12}>
          <ViewersStack viewers={people.slice(0, 1)} />
          <ViewersStack viewers={people.slice(0, 2)} />
          <ViewersStack viewers={people.slice(0, 3)} />
        </Col>
      </Section>
      <Section title="Больше maxVisibleCount" description="Показывается maxVisibleCount - 1 аватар и счётчик остальных">
        <Col gap={12}>
          <ViewersStack viewers={people} />
          <ViewersStack viewers={people} maxVisibleCount={5} />
        </Col>
      </Section>
      <Section title="С картинкой и без">
        <Col gap={12}>
          <ViewersStack viewers={withImages} />
          <ViewersStack viewers={people.slice(0, 3)} />
        </Col>
      </Section>
      <Section title="С подписью (label)">
        <ViewersStack viewers={people.slice(0, 3)} label="Сейчас просматривают" />
      </Section>
      <Section title="Без анимации (animated=false)">
        <ViewersStack viewers={people.slice(0, 3)} animated={false} />
      </Section>
    </Col>
  ),
};
