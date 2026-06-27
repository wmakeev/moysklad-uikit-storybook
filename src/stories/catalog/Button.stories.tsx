import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonVariants, ButtonSize } from '@moysklad/uikit';
import { Add16Icon, Check16Icon } from '@moysklad/uikit/icon';
import { Row, Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Actions/Button',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={24}>
      <Section title="Варианты">
        <Row>
          {Object.values(ButtonVariants).map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </Row>
      </Section>
      <Section title="Размеры">
        <Row>
          {Object.values(ButtonSize).map((size) => (
            <Button key={size} size={size}>
              size: {size}
            </Button>
          ))}
        </Row>
      </Section>
      <Section title="Состояния">
        <Row>
          <Button>Обычная</Button>
          <Button isLoading>Загрузка</Button>
          <Button disabled>Disabled</Button>
        </Row>
      </Section>
      <Section title="С иконкой">
        <Row>
          <Button>
            <Add16Icon /> Добавить
          </Button>
          <Button variant={ButtonVariants.SECONDARY}>
            <Check16Icon /> Готово
          </Button>
          <Button isIconButton variant={ButtonVariants.SECONDARY} aria-label="Добавить">
            <Add16Icon />
          </Button>
        </Row>
      </Section>
    </Col>
  ),
};
