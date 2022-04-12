import React from 'react';
import { t } from '@lingui/macro';
import { useModals } from '@mantine/modals';
import { LoadingOverlay, Select } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectCategories } from 'meridian/categories';
import { TorrentInfo } from 'meridian/models';
import { selectTorrents } from '../state';
import { useSetTorrentCategory } from '../hooks';

interface Props {
    hash: string;
}

const TorrentCategoryModal = ({ hash }: Props) => {
    const categories = useSelector(selectCategories);
    const torrents = useSelector(selectTorrents);
    const setTorrentCategory = useSetTorrentCategory();

    if (!categories || !torrents) {
        return <LoadingOverlay visible />;
    }

    const torrent = torrents.filter(x => x.hash === hash)[0];

    return (
        <Select
            allowDeselect
            label={t`Category`}
            value={torrent.category}
            data={Object.keys(categories)}
            onChange={category =>
                setTorrentCategory([torrent.hash], category ?? '')
            }
        />
    );
};

const useTorrentCategoryModal = () => {
    const modals = useModals();

    return (torrent: TorrentInfo) =>
        modals.openModal({
            title: torrent.name,
            children: <TorrentCategoryModal hash={torrent.hash} />,
            centered: true,
        });
};

export default useTorrentCategoryModal;
