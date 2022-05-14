import React from 'react';
import { useSelector } from 'react-redux';
import { useModals } from '@mantine/modals';
import { LoadingOverlay, Tabs } from '@mantine/core';
import { useFetchResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';
import { t } from '@lingui/macro';
import { selectTorrentProperties } from '../state';
import { GeneralTab, TransferTab } from './tabs';

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
        </Tabs>
    );
};

const useTorrentPropertiesModal = () => {
    const modals = useModals();
    const fetchTorrentProperties = useFetchResource(
        Resource.TORRENT_PROPERTIES
    );

    return React.useCallback(
        (hash: string, name: string) => {
            fetchTorrentProperties({ hash });
            modals.openModal({
                title: name,
                children: <TorrentPropertiesModal />,
                centered: true,
                size: 'xl',
            });
        },
        [modals, fetchTorrentProperties]
    );
};

export default useTorrentPropertiesModal;
