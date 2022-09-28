import React, { useCallback } from 'react';
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
        <Tabs
            styles={{
                tab: {
                    paddingInline: 8,
                },
            }}
            variant='outline'
            radius='md'
            defaultValue='general'
        >
            <Tabs.List>
                <Tabs.Tab value='general'>{t`General`}</Tabs.Tab>
                <Tabs.Tab value='transfer'>{t`Transfer`}</Tabs.Tab>
                <Tabs.Tab value='contents'>{t`Contents`}</Tabs.Tab>
                <Tabs.Tab value='trackers'>{t`Trackers`}</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='general'>
                <GeneralTab {...torrentProperties} />
            </Tabs.Panel>
            <Tabs.Panel value='transfer'>
                <TransferTab {...torrentProperties} />
            </Tabs.Panel>
            <Tabs.Panel value='contents'>
                <ContentsTab />
            </Tabs.Panel>
            <Tabs.Panel value='trackers'>
                <TrackersTab />
            </Tabs.Panel>
        </Tabs>
    );
};

const useTorrentPropertiesModal = () => {
    const modals = useModals();
    const fetchTorrentProperties = useFetchResource(Resource.TORRENT_PROPERTIES);
    const fetchTorrentContents = useFetchResource(Resource.TORRENT_CONTENT);
    const fetchTorrentTrackers = useFetchResource(Resource.TORRENT_TRACKERS);

    return useCallback(
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
