import type { Preview } from '@storybook/react';

// Токены дизайн-системы @moysklad/uikit — подключаем CSS-переменные один раз
import '@moysklad/uikit/colorVariables.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Белый',
      values: [
        { name: 'Белый', value: 'var(--bgd-white, #fff)' },
        { name: 'Серый', value: '#f6f6f6' },
        { name: 'Вторичный', value: '#f1f4f9' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Введение',
          'Токены',
          ['Цвета', 'Типографика', 'Иконки'],
          'Компоненты',
          [
            'Кнопки и действия',
            'Формы и ввод',
            'Поля Label-Value',
            'Навигация',
            'Оверлеи',
            'Статусы и фидбек',
            'Контейнеры',
          ],
          'Демо-сборки',
          '*',
        ],
      },
    },
  },
};

export default preview;
