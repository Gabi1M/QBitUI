import { t } from '@lingui/macro';
import { ContextMenuItem } from 'meridian/generic';
import { TorrentInfo } from 'meridian/models';
import React from 'react';
import {
    BoxMultiple,
    Download,
    FileCheck,
    PlayerPause,
    PlayerPlay,
    Tag,
    Trash,
} from 'tabler-icons-react';
import { useTorrentActions } from './hooks';
import {
    useDeleteTorrentsModal,
    useTorrentCategoryModal,
    useTorrentTagsModal,
} from './modals';

const useContextMenuItems = (torrent: TorrentInfo): ContextMenuItem[] => {
    const {
        pauseTorrents,
        resumeTorrents,
        forceDownloadTorrents,
        recheckTorrents,
    } = useTorrentActions();
    const deleteTorrents = useDeleteTorrentsModal();
    const openCategoryModal = useTorrentCategoryModal();
    const openTagsModal = useTorrentTagsModal();

    return React.useMemo(
        () => [
            {
                text: t`Pause`,
                icon: <PlayerPause />,
                callback: () => pauseTorrents([torrent.hash]),
            },
            {
                text: t`Resume`,
                icon: <PlayerPlay />,
                callback: () => resumeTorrents([torrent.hash]),
            },
            {
                text: t`Force download`,
                icon: <Download />,
                callback: () => forceDownloadTorrents([torrent.hash]),
            },
            {
                text: t`Recheck`,
                icon: <FileCheck />,
                callback: () => recheckTorrents([torrent.hash]),
            },
            {
                text: t`Delete`,
                icon: <Trash />,
                callback: () => deleteTorrents([torrent.hash]),
            },
            {
                text: t`Categories`,
                icon: <BoxMultiple />,
                callback: () => openCategoryModal(torrent),
            },
            {
                text: t`Tags`,
                icon: <Tag />,
                callback: () => openTagsModal(torrent),
            },
        ],
        [
            torrent,
            pauseTorrents,
            resumeTorrents,
            forceDownloadTorrents,
            recheckTorrents,
            deleteTorrents,
            openCategoryModal,
            openTagsModal,
        ]
    );
};

export default useContextMenuItems;
