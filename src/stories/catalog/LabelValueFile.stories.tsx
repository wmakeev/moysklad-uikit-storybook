import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { LabelValueFile, useFileUploader } from '@moysklad/uikit';
import { Col, Section } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Fields/LabelValueFile',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

const IMAGE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#4a90e2"/></svg>';
const IMAGE_URL = `data:image/svg+xml;utf8,${encodeURIComponent(IMAGE_SVG)}`;

const makeFile = (name: string, type: string, preview: string, content: BlobPart) =>
  Object.assign(new File([content], name, { type }), { id: name, preview });

const imageFile = () => makeFile('photo.svg', 'image/svg+xml', IMAGE_URL, IMAGE_SVG);
const pdfFile = () => makeFile('Счёт-фактура.pdf', 'application/pdf', '', '%PDF-1.4');

/** Хелпер: поле с собственным useFileUploader, опционально с начальным файлом. */
const FileField = ({
  initial,
  ...props
}: {
  initial?: () => ReturnType<typeof makeFile>;
} & Omit<React.ComponentProps<typeof LabelValueFile>, 'fileUploader'>) => {
  const fileUploader = useFileUploader({ multiple: false });
  const { setFiles } = fileUploader;
  useEffect(() => {
    if (initial) setFiles([initial()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <LabelValueFile {...props} fileUploader={fileUploader} />;
};

export const Overview: Story = {
  name: 'Обзор',
  render: () => (
    <Col gap={24} style={box}>
      <Section title="Пусто — клик открывает выбор файла" description="Текст по умолчанию «Загрузить».">
        <FileField label="Договор" />
      </Section>
      <Section title="Свой текст пустого значения (emptyText)">
        <FileField label="Договор" emptyText="Прикрепить файл" />
      </Section>
      <Section title="Файл-картинка">
        <FileField label="Фото" initial={imageFile} />
      </Section>
      <Section title="Файл другого типа">
        <FileField label="Документ" initial={pdfFile} />
      </Section>
      <Section title="Обязательное (required) и с подсказкой (helpPopupContent)">
        <FileField label="Скан паспорта" required helpPopupContent="Загрузите скан главной страницы." />
      </Section>
      <Section title="Недоступное (disabled)">
        <Col gap={4}>
          <FileField label="Договор" disabled />
          <FileField label="Документ" disabled initial={pdfFile} />
        </Col>
      </Section>
      <Section title="С ошибкой (error)">
        <FileField label="Договор" error />
      </Section>
    </Col>
  ),
};
