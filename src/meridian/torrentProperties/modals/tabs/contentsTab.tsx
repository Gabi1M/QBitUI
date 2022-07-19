import React from 'react';
import { useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import { LoadingOverlay, ScrollArea, Table, Tooltip, createStyles } from '@mantine/core';

import { FilePriorityDescription, TorrentContent } from 'meridian/models';
import { selectTorrentContent } from 'meridian/torrentContent';
import { bytesToSize, truncateLongText } from 'meridian/utils';

const ContentsTab = () => {
    const styles = useStyles();
    const contents = useSelector(selectTorrentContent);
    if (!contents) {
        return <LoadingOverlay visible />;
    }

    return (
        <ScrollArea className={styles.classes.root} scrollbarSize={2}>
            <Table highlightOnHover striped>
                <thead>
                    <tr>
                        <th>{t`Name`}</th>
                        <th>{t`Size`}</th>
                        <th>{t`Progress`}</th>
                        <th>{t`Priority`}</th>
                    </tr>
                </thead>
                <tbody>
                    {contents.map((file) => (
                        <FileItem key={file.name} file={file} />
                    ))}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

interface FileItemProps {
    file: TorrentContent;
}

const FileItem = ({ file }: FileItemProps) => (
    <tr key={file.name}>
        <td>
            <Tooltip wrapLines label={file.name}>
                {truncateLongText(file.name, 100)}
            </Tooltip>
        </td>
        <td>{bytesToSize(file.size)}</td>
        <td>{file.progress * 100}</td>
        <td>{FilePriorityDescription[file.priority]}</td>
    </tr>
);

const useStyles = createStyles({
    root: {
        height: '50vh',
    },
});

export default ContentsTab;
