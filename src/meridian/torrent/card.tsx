import React from 'react';
import { t } from '@lingui/macro';
import { TorrentInfo } from 'meridian/models';
import { Card, ContextMenuItem } from 'meridian/generic';
import { CardItemProps } from 'meridian/generic/card';
import { bytesToSize } from 'meridian/utils';
import { StateToStringMapping } from './types';
import { BoxMultiple, Download, FileCheck, PlayerPause, PlayerPlay, Tag, Trash } from 'tabler-icons-react';
import { useForceDownloadTorrents, usePauseTorrents, useRecheckTorrents, useResumeTorrents } from './hooks';
import { useDeleteTorrentsModal, useTorrentCategoryModal, useTorrentTagsModal } from './modals';

interface Props {
    torrent: TorrentInfo;
}

const TorrentCard = ({ torrent }: Props) => {
    const itemGroups = useTorrentCardItemGroups(torrent);
    const contextMenuItems = useTorrentContextMenuItems(torrent);

    return (
        <Card p='sm' m='sm' title={torrent.name} itemGroups={itemGroups} completionTotal={100} completion={torrent.progress * 100} contextMenuItems={contextMenuItems} />
    );
};

const useTorrentContextMenuItems = (torrent: TorrentInfo): ContextMenuItem[] => {
    const pauseTorrents = usePauseTorrents();
    const resumeTorrents = useResumeTorrents();
    const forceDownloadTorrents = useForceDownloadTorrents();
    const recheckTorrents = useRecheckTorrents();
    const deleteTorrents = useDeleteTorrentsModal();
    const openCategoryModal = useTorrentCategoryModal();
    const openTagsModal = useTorrentTagsModal();

    return React.useMemo(() => ([
        {
            text: t`Pause`,
            icon: <PlayerPause />,
            callback: () => pauseTorrents([torrent.hash])
        }, {
            text: t`Resume`,
            icon: <PlayerPlay />,
            callback: () => resumeTorrents([torrent.hash])
        }, {
            text: t`Force download`,
            icon: <Download />,
            callback: () => forceDownloadTorrents([torrent.hash])
        }, {
            text: t`Recheck`,
            icon: <FileCheck />,
            callback: () => recheckTorrents([torrent.hash])
        }, {
            text: t`Delete`,
            icon: <Trash />,
            callback: () => deleteTorrents([torrent])
        }, {
            text: t`Categories`,
            icon: <BoxMultiple />,
            callback: () => openCategoryModal(torrent)
        }, {
            text: t`Tags`,
            icon: <Tag />,
            callback: () => openTagsModal(torrent)
        }
    ]), [torrent, pauseTorrents, resumeTorrents, forceDownloadTorrents, recheckTorrents, deleteTorrents, openCategoryModal, openTagsModal])
};

const useTorrentCardItemGroups = (torrent: TorrentInfo) => React.useMemo(() => {
    const row1: CardItemProps[] = [
        {
            name: t`Status`,
            value: StateToStringMapping[torrent.state].stateText,
            type: 'badge',
        }
    ]
    const row2: CardItemProps[] = [
        {
            name: t`Save path`,
            value: torrent.save_path
        },
        {
            name: t`Size`,
            value: bytesToSize(torrent.size),
        },
        {
            name: t`Seeders`,
            value: torrent.num_seeds.toString()
        },
        {
            name: t`Leechers`,
            value: torrent.num_leechs.toString()
        },
        {
            name: t`Ratio`,
            value: torrent.ratio.toFixed(2),
        },
    ]

    const row3: CardItemProps[] = [
        {
            name: t`Download speed`,
            value: bytesToSize(torrent.dlspeed),
        }, {
            name: t`Upload speed`,
            value: bytesToSize(torrent.upspeed)
        }
    ]

    const row4: CardItemProps[] = [];

    if (torrent.category !== '') {
        row4.push(
            {
                name: t`Category`,
                value: torrent.category,
                type: 'badge',
            }
        )
    }

    if (torrent.tags !== '') {
        row4.push(
            {
                name: t`Tags`,
                value: torrent.tags.split(','),
                type: 'badge',
            }
        )
    }

    const itemGroups = [
        row1,
        row2,
        row3,
        row4
    ]

    return itemGroups;
}, [torrent]);

export default TorrentCard;