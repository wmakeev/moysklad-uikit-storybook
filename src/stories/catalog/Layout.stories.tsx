import type { Meta, StoryObj } from '@storybook/react';
import { BentoBlock, Layout, Text, TextVariant } from '@moysklad/uikit';
import { Panel } from '@moysklad/uikit/components/Panel';
import { LabelValue } from '@moysklad/uikit/components/LabelValue';
import type { ReactNode } from 'react';

/**
 * Layout занимает весь экран (min-width 1200px, min-height 100dvh),
 * поэтому все истории идут в режиме fullscreen.
 */
const meta: Meta = {
  title: 'Компоненты/Containers/Layout',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const AppHeader = () => (
  <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-primary, #e5e7eb)' }}>
    <Text variant={TextVariant.bodyStrong}>МойСклад</Text>
  </div>
);

const PageTitle = () => (
  <Text variant={TextVariant.heading2}>Заказ покупателя № 00042</Text>
);

const Sidebar = () => (
  <BentoBlock paddingVariant="p16">
    <Text variant={TextVariant.bodyStrong}>Фильтры</Text>
    <Text variant={TextVariant.body}>Статус, склад, дата</Text>
  </BentoBlock>
);

const Content = ({ rows = 1 }: { rows?: number }) => (
  <>
    {Array.from({ length: rows }, (_, i) => (
      <BentoBlock key={i}>
        <Text variant={TextVariant.heading4}>Основные данные</Text>
        <Panel
          items={[
            { id: 's', width: 2, element: <LabelValue label="Статус" value="Проведён" /> },
            { id: 'c', width: 2, element: <LabelValue label="Контрагент" value="ООО «Ромашка»" /> },
            { id: 'a', width: 2, element: <LabelValue label="Сумма" value="14 990 ₽" /> },
          ]}
        />
      </BentoBlock>
    ))}
  </>
);

const Note = ({ children }: { children: ReactNode }) => (
  <Text variant={TextVariant.caption}>{children}</Text>
);

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Layout
      header={<AppHeader />}
      contentHeader={<PageTitle />}
      aside={<Sidebar />}
      content={<Content />}
    />
  ),
};

export const ContentOnly: Story = {
  name: 'Только контент',
  render: () => <Layout header={<AppHeader />} content={<Content />} />,
};

export const StickyContentHeader: Story = {
  name: 'Закреплённый заголовок',
  render: () => (
    <Layout
      header={<AppHeader />}
      contentHeader={<PageTitle />}
      stickyContentHeader
      aside={<Sidebar />}
      content={<Content rows={6} />}
    />
  ),
};

export const FullWidth: Story = {
  name: 'На всю ширину',
  render: () => (
    <Layout
      header={<AppHeader />}
      contentHeader={<PageTitle />}
      fullWidth
      content={<Content />}
    />
  ),
};

export const WhiteBackground: Story = {
  name: 'Белый фон',
  render: () => (
    <Layout
      bgColor="white"
      header={<AppHeader />}
      contentHeader={<PageTitle />}
      aside={<Sidebar />}
      content={
        <>
          <Note>bgColor=&quot;white&quot;: фон страницы, шапки и заголовка контента белый.</Note>
          <Content />
        </>
      }
    />
  ),
};

export const LargeBottomPadding: Story = {
  name: 'Большой нижний отступ',
  render: () => (
    <Layout
      showLargePaddingBottom
      header={<AppHeader />}
      contentHeader={<PageTitle />}
      content={
        <>
          <Note>showLargePaddingBottom: нижний отступ 100px вместо 32px.</Note>
          <Content />
        </>
      }
    />
  ),
};
