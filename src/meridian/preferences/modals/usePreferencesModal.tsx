import React from 'react';

import { t } from '@lingui/macro';

import { Accordion, Button } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';

import {
    BitTorrentSection,
    ConnectionSection,
    DownloadsSection,
    SpeedSection,
    WebUiSection,
} from './sections';
import usePreferences from './usePreferences';

const PreferencesModal = () => {
    const { onSave, preferences, updatePreferencesKey, updateBulkPreferencesKey } =
        usePreferences();

    const sectionProps = {
        preferences,
        updatePreferencesKey,
        updateBulkPreferencesKey,
    };

    return (
        <>
            <Accordion multiple offsetIcon={false}>
                <Accordion.Item label={t`Downloads`}>
                    <DownloadsSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item label={t`Connection`}>
                    <ConnectionSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item label={t`Speed`}>
                    <SpeedSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item label={t`BitTorrent`}>
                    <BitTorrentSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item label={t`Web UI`}>
                    <WebUiSection {...sectionProps} />
                </Accordion.Item>
            </Accordion>
            <Button mt='md' fullWidth onClick={onSave}>{t`Save`}</Button>
        </>
    );
};

const usePreferencesModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Preferences`,
            children: <PreferencesModal />,
            size: 'xl',
            ...commonModalConfiguration,
        });
};

export default usePreferencesModal;
