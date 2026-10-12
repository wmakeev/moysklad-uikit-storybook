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
    // Без value неуправляемый Textfield 31.20.0 показывает строку «undefined»
    const [comment, setComment] = useState('');
    const [sizeM, setSizeM] = useState('');
    const [sizeL, setSizeL] = useState('');
    const [resized, setResized] = useState('');
    return (
      <Col gap={28} style={box}>
        <Section title="Базовое поле с лимитом и подсказкой">
          <Textfield
            name="comment"
            label="Комментарий"
            placeholder="Введите текст…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            limit={200}
            showCounterLimit={200}
            autoVerticalResize
            helpProps={{ popup: 'Комментарий увидят все сотрудники' }}
          />
        </Section>
        <Section title="Размеры: m и l">
          <Col gap={16}>
            <Textfield
              name="size-m"
              label="size m"
              size="m"
              placeholder="Размер M"
              value={sizeM}
              onChange={(e) => setSizeM(e.target.value)}
            />
            <Textfield
              name="size-l"
              label="size l"
              size="l"
              placeholder="Размер L"
              value={sizeL}
              onChange={(e) => setSizeL(e.target.value)}
            />
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
            value={resized}
            onChange={(e) => setResized(e.target.value)}
            resizeTop
            resizeBottom
          />
        </Section>
      </Col>
    );
  },
};
