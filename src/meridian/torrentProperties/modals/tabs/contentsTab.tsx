import React from 'react';
import { useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import {
    Badge,
    Box,
    LoadingOverlay,
    RingProgress,
    ScrollArea,
    Text,
    Tooltip,
    createStyles,
} from '@mantine/core';

import { FilePriorityDescription, TorrentContent } from 'meridian/models';
import { selectTorrentContent } from 'meridian/torrentContent';
import { bytesToSize } from 'meridian/utils';

const ContentsTab = () => {
    const styles = useStyles();
    const contents = useSelector(selectTorrentContent);
    if (!contents) {
        return <LoadingOverlay visible />;
    }

    return (
        <ScrollArea className={styles.classes.scroll}>
            {contents.map((file) => (
                <FileItem key={file.name} file={file} />
            ))}
        </ScrollArea>
    );
};

interface FileItemProps {
    file: TorrentContent;
}

const FileItem = ({ file }: FileItemProps) => {
    const styles = useStyles();

    return (
        <Box className={styles.classes.item}>
            <RingProgress
                size={40}
                thickness={4}
                roundCaps
                sections={[{ value: file.progress * 100, color: 'green' }]}
            />
            <Box className={styles.classes.container}>
                <Tooltip label={file.name} multiline>
                    <Text lineClamp={1}>{file.name}</Text>
                </Tooltip>
                <Box className={styles.classes.container2}>
                    <Text size='sm'>{bytesToSize(file.size)}</Text>
                    <Tooltip label={t`Status`}>
                        <Badge>{FilePriorityDescription[file.priority]}</Badge>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

const useStyles = createStyles((theme) => ({
    scroll: {
        height: '50vh',
    },
    item: {
        marginBlock: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.dark[6],
        borderRadius: theme.radius.md,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    },
    container2: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export default ContentsTab;
