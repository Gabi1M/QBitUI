import React from 'react';

import { t } from '@lingui/macro';
import {
    BoxMultiple,
    Download,
    FileCheck,
    List,
    PlayerPause,
    PlayerPlay,
    Tag,
    Trash,
} from 'tabler-icons-react';

import { ContextMenuItem } from 'meridian/generic';
import { useTorrentPropertiesModal } from 'meridian/torrentProperties';

import { useTorrentActions } from './hooks';
import { useDeleteTorrentsModal, useTorrentCategoryModal, useTorrentTagsModal } from './modals';

const useContextMenuItems = (hash: string, name: string): ContextMenuItem[] => {
    const { pauseTorrents, resumeTorrents, forceDownloadTorrents, recheckTorrents } =
        useTorrentActions();
    const deleteTorrents = useDeleteTorrentsModal();
    const openCategoryModal = useTorrentCategoryModal();
    const openTagsModal = useTorrentTagsModal();
    const openPropertiesModal = useTorrentPropertiesModal();

    return React.useMemo(
        () => [
            {
                text: t`Pause`,
                icon: <PlayerPause />,
                callback: () => pauseTorrents([hash]),
            },
            {
                text: t`Resume`,
                icon: <PlayerPlay />,
                callback: () => resumeTorrents([hash]),
            },
            {
                text: t`Force download`,
                icon: <Download />,
                callback: () => forceDownloadTorrents([hash]),
            },
            {
                text: t`Recheck`,
                icon: <FileCheck />,
                callback: () => recheckTorrents([hash]),
            },
            {
                text: t`Delete`,
                icon: <Trash />,
                callback: () => deleteTorrents([hash]),
            },
            {
                text: t`Categories`,
                icon: <BoxMultiple />,
                callback: () => openCategoryModal(hash, name),
            },
            {
                text: t`Tags`,
                icon: <Tag />,
                callback: () => openTagsModal(hash, name),
            },
            {
                text: t`Details`,
                icon: <List />,
                callback: () => openPropertiesModal(hash, name),
            },
        ],
        [
            hash,
            name,
            pauseTorrents,
            resumeTorrents,
            forceDownloadTorrents,
            recheckTorrents,
            deleteTorrents,
            openCategoryModal,
            openTagsModal,
            openPropertiesModal,
        ],
    );
};

export default useContextMenuItems;
