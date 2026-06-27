import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader, useFileUploader, Text, type IFile } from '@moysklad/uikit';
import { Col } from '../../shared/Showcase';

const meta: Meta = {
  title: 'Компоненты/Forms/FileUploader',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const box = { maxWidth: 420 };

export const Overview: Story = {
  name: 'Обзор',
  render: () => {
    const uploader = useFileUploader();
    return (
      <Col gap={12} style={box}>
        <FileUploader.Trigger {...uploader}>
          <div
            style={{
              border: '1px dashed var(--border-normal)',
              borderRadius: 12,
              padding: 24,
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <Text color="secondary">Перетащите файлы сюда или нажмите для выбора</Text>
          </div>
        </FileUploader.Trigger>
        <FileUploader
          files={uploader.files}
          invalidFiles={uploader.invalidFiles}
          loadingFiles={uploader.loadingFiles}
          onDeleteFile={(f: IFile) => uploader.removeFile(f)}
        />
      </Col>
    );
  },
};
