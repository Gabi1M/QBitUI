import React from 'react';
import { LoadingOverlay, Switch } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { selectTags } from 'meridian/tags';
import { useSelector } from 'react-redux';
import { TorrentInfo } from 'meridian/models';
import { selectMainData } from 'meridian/mainData';
import { useManageTorrentTags } from '../hooks';

interface Props {
    hash: string;
}

const TorrentTagsModal = ({ hash }: Props) => {
    const tags = useSelector(selectTags);
    const mainData = useSelector(selectMainData);
    const { addTags, removeTags } = useManageTorrentTags();

    if (!tags || !mainData) {
        return <LoadingOverlay visible />;
    }

    const torrents = Object.values(mainData.torrents);
    const torrent = torrents.filter(x => x.hash === hash)[0];

    const torrentTags =
        torrent.tags === '' ? [] : torrent.tags.split(',').map(x => x.trim());

    return (
        <>
            {tags.map(tag => (
                <Switch
                    mt='md'
                    label={tag}
                    checked={torrentTags.includes(tag)}
                    onChange={value => {
                        if (value.target.checked) {
                            addTags([torrent.hash], [tag]);
                        } else {
                            removeTags([torrent.hash], [tag]);
                        }
                    }}
                />
            ))}
        </>
    );
};

const useTorrentTagsModal = () => {
    const modals = useModals();

    return (torrent: TorrentInfo) =>
        modals.openModal({
            title: torrent.name,
            children: <TorrentTagsModal hash={torrent.hash} />,
            centered: true,
        });
};

export default useTorrentTagsModal;
