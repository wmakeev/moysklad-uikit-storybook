import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progressbar, Button } from '@moysklad/uikit';
import { Row, Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Status/Progressbar',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const [value, setValue] = useState(40);
    return (
      <Col gap={16} style={{ maxWidth: 420 }}>
        <Progressbar
          state="progress"
          value={value}
          progressLabel={`Загрузка ${value}%`}
          successLabel="Готово"
          errorLabel="Ошибка"
        />
        <Row>
          <Button size="m" variant="secondary" onClick={() => setValue((v) => Math.max(0, v - 10))}>
            −10%
          </Button>
          <Button size="m" variant="secondary" onClick={() => setValue((v) => Math.min(100, v + 10))}>
            +10%
          </Button>
        </Row>
        <Progressbar state="success" value={100} progressLabel="" successLabel="Успешно загружено" errorLabel="" />
        <Progressbar state="error" value={70} progressLabel="" successLabel="" errorLabel="Не удалось загрузить" />
      </Col>
    );
  },
};
