import React from 'react';
import { useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import { LoadingOverlay, Tabs } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useFetchResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';

import { selectTorrentProperties } from '../state';

import { ContentsTab, GeneralTab, TrackersTab, TransferTab } from './tabs';

const TorrentPropertiesModal = () => {
    const torrentProperties = useSelector(selectTorrentProperties);

    if (!torrentProperties) {
        return <LoadingOverlay visible />;
    }

    return (
        <Tabs>
            <Tabs.Tab label={t`General`}>
                <GeneralTab {...torrentProperties} />
            </Tabs.Tab>
            <Tabs.Tab label={t`Transfer`}>
                <TransferTab {...torrentProperties} />
            </Tabs.Tab>
            <Tabs.Tab label={t`Contents`}>
                <ContentsTab />
            </Tabs.Tab>
            <Tabs.Tab label={t`Trackers`}>
                <TrackersTab />
            </Tabs.Tab>
        </Tabs>
    );
};

const useTorrentPropertiesModal = () => {
    const modals = useModals();
    const fetchTorrentProperties = useFetchResource(Resource.TORRENT_PROPERTIES);
    const fetchTorrentContents = useFetchResource(Resource.TORRENT_CONTENT);
    const fetchTorrentTrackers = useFetchResource(Resource.TORRENT_TRACKERS);

    return React.useCallback(
        (hash: string, name: string) => {
            fetchTorrentProperties({ hash });
            fetchTorrentContents({ hash });
            fetchTorrentTrackers({ hash });
            modals.openModal({
                title: name,
                children: <TorrentPropertiesModal />,
                size: 'xl',
                ...commonModalConfiguration,
            });
        },
        [modals, fetchTorrentProperties, fetchTorrentContents, fetchTorrentTrackers],
    );
};

export default useTorrentPropertiesModal;
