import React from 'react';
import { t } from '@lingui/macro';
import { useModals } from '@mantine/modals';
import { Button, Checkbox } from '@mantine/core';
import { TorrentInfo } from 'meridian/models';
import { useDeleteTorrents } from '../hooks';

interface Props {
    torrents: TorrentInfo[];
}

const DeleteTorrentsModal = ({ torrents }: Props) => {
    const modals = useModals();
    const [deleteFiles, setDeleteFiles] = React.useState(false);
    const deleteTorrents = useDeleteTorrents();

    const onSubmit = React.useCallback(() => {
        deleteTorrents(
            torrents.map(torrent => torrent.hash),
            deleteFiles
        );
        modals.closeAll();
    }, [modals, deleteFiles, deleteTorrents, torrents]);

    return (
        <>
            <Checkbox
                label={t`Also delete files`}
                checked={deleteFiles}
                onChange={event => setDeleteFiles(event.target.checked)}
            />
            <Button mt='md' fullWidth onClick={onSubmit}>{t`Delete`}</Button>
        </>
    );
};

const useDeleteTorrentsModal = () => {
    const modals = useModals();

    return (torrents: TorrentInfo[]) =>
        modals.openModal({
            title: t`Delete torrents`,
            children: <DeleteTorrentsModal torrents={torrents} />,
            centered: true,
        });
};

export default useDeleteTorrentsModal;
