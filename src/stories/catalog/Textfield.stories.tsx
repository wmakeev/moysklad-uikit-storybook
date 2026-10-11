import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textfield, useFileUploader, type IFile } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/Textfield',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 360 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const uploader = useFileUploader();
    const [text, setText] = useState('');
    return (
      <Col gap={28} style={box}>
        <Section title="Базовое поле с лимитом и подсказкой">
          <Textfield
            name="comment"
            label="Комментарий"
            placeholder="Введите текст…"
            limit={200}
            showCounterLimit={200}
            autoVerticalResize
            helpProps={{ popup: 'Комментарий увидят все сотрудники' }}
          />
        </Section>
        <Section title="Размеры: m и l">
          <Col gap={16}>
            <Textfield name="size-m" label="size m" size="m" placeholder="Размер M" />
            <Textfield name="size-l" label="size l" size="l" placeholder="Размер L" />
          </Col>
        </Section>
        <Section title="Кнопки действий: отправить, эмодзи, файл">
          <Textfield
            name="actions"
            label="Сообщение"
            placeholder="Напишите сообщение…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onMainBtnClick={() => setText('')}
            onEmojiBtnClick={() => setText((t) => t + '🙂')}
            isFileBtnVisible
            fileUploaderProps={{
              files: uploader.files,
              invalidFiles: uploader.invalidFiles,
              loadingFiles: uploader.loadingFiles,
              onDeleteFile: (f: IFile) => uploader.removeFile(f),
              handleOpen: uploader.open,
              getInputProps: uploader.getInputProps,
            }}
          />
        </Section>
        <Section title="Ручное изменение высоты: resizeTop и resizeBottom">
          <Textfield
            name="resize"
            label="Потяните за верхнюю или нижнюю кромку"
            placeholder="Текст…"
            resizeTop
            resizeBottom
          />
        </Section>
      </Col>
    );
  },
};
