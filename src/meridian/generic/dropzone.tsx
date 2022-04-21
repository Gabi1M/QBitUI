import React from 'react';
import { t } from '@lingui/macro';
import { ActionIcon, Badge, Group, Text } from '@mantine/core';
import { Dropzone as LibDropzone, DropzoneStatus } from '@mantine/dropzone';
import { X } from 'tabler-icons-react';
import { truncateLongText } from 'meridian/utils';
import useWindowSize from './useWindowSize';

interface FileBadgeProps {
    file: File;
    onRemove: (file: File) => void;
}

const FileBadge = ({ file, onRemove }: FileBadgeProps) => {
    const { width } = useWindowSize();
    const removeButton = (
        <ActionIcon
            onClick={() => onRemove(file)}
            size='xs'
            color='blue'
            radius='xl'
            variant='transparent'
        >
            <X size={20} />
        </ActionIcon>
    );

    return (
        <Badge mb={5} fullWidth size='lg' rightSection={removeButton}>
            {width < 400 ? truncateLongText(file.name) : file.name}
        </Badge>
    );
};

export const DropzoneChildren = (status: DropzoneStatus) => {
    let text = t`Drag torrent files here or click to select files`;
    if (status.accepted) {
        text = t`Files selected. Drag here or click to select again.`;
    } else if (status.rejected) {
        text = t`Failed to select files. Drag here or click to select again.`;
    }
    return (
        <Group position='center' spacing='xl' style={{ pointerEvents: 'none' }}>
            <div>
                <Text align='center' size='xl' inline>
                    {text}
                </Text>
            </div>
        </Group>
    );
};

interface Props {
    files: File[];
    onDrop: (files: File[]) => void;
    onRemove: (file: File) => void;
}

const Dropzone = ({ files, onDrop, onRemove }: Props) => (
    <>
        <LibDropzone mb={10} onDrop={onDrop} maxSize={3 * 1024 ** 2}>
            {DropzoneChildren}
        </LibDropzone>
        {files.map(file => (
            <FileBadge file={file} onRemove={onRemove} />
        ))}
    </>
);

export default Dropzone;
