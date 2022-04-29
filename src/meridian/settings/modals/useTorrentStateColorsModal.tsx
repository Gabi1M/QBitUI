import React from 'react';
import { t } from '@lingui/macro';
import { useModals } from '@mantine/modals';
import { ColorInput } from '@mantine/core';
import { TorrentStateDescription } from 'meridian/models';
import useSettings from './useSettings';

const TorrentStateColorsModal = () => {
    const { settings, handleSettingsChange } = useSettings();

    return (
        <>
            {Object.values(TorrentStateDescription).map(description => (
                <ColorInput
                    label={description}
                    value={settings.torrentStateColors[description]}
                    onChange={value => {
                        handleSettingsChange('torrentStateColors', {
                            ...settings.torrentStateColors,
                            [description]: value,
                        });
                    }}
                />
            ))}
        </>
    );
};

const useTorrentStateColorsModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Torrent state badge colors`,
            children: <TorrentStateColorsModal />,
            centered: true,
        });
};

export default useTorrentStateColorsModal;
