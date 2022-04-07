import React from 'react';
import { t } from '@lingui/macro';
import { ActionIcon, Badge, Group, Text } from '@mantine/core';
import { Dropzone as LibDropzone, DropzoneStatus } from '@mantine/dropzone';
import { X } from 'tabler-icons-react';

interface FileBadgeProps {
    file: File, 
    onRemove: (file: File) => void,
}

const FileBadge = ({file, onRemove}: FileBadgeProps) => {
    const removeButton = (
        <ActionIcon onClick={() => onRemove(file)} size="xs" color="blue" radius="xl" variant="transparent">
            <X size={20} />
        </ActionIcon>
    );

    return <Badge mb={5} fullWidth size='lg' rightSection={removeButton}>{file.name}</Badge>
}

export const dropzoneChildren = (status: DropzoneStatus, files: File[], onRemove: (file: File) => void) => (
    <Group position="center" spacing="xl" style={{  pointerEvents: 'none' }}>
        <div>
            <Text align='center' size="xl" inline>
                {t`Drag torrent files here or click to select files`}
            </Text>
        </div>
    </Group>
);

interface Props {
    files: File[],
    onDrop: (files: File[]) => void,
    onRemove: (file: File) => void,
}

const Dropzone = ({ files, onDrop, onRemove }: Props) => {
    return (
        <>
            <LibDropzone
                mb={10}
                onDrop={onDrop}
                maxSize={3 * 1024 ** 2}
            >
                {(status) => dropzoneChildren(status, files, onRemove)}
            </LibDropzone>
            {files.map(file => <FileBadge file={file} onRemove={onRemove} />)}
        </>
    )
}

export default Dropzone;