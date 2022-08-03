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
            <Accordion multiple variant='separated' radius='xl'>
                <Accordion.Item value={t`Downloads`}>
                    <Accordion.Control>{t`Downloads`}</Accordion.Control>
                    <DownloadsSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item value={t`Connection`}>
                    <Accordion.Control>{t`Connection`}</Accordion.Control>
                    <ConnectionSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item value={t`Speed`}>
                    <Accordion.Control>{t`Speed`}</Accordion.Control>
                    <SpeedSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item value={t`BitTorrent`}>
                    <Accordion.Control>{t`BitTorrent`}</Accordion.Control>
                    <BitTorrentSection {...sectionProps} />
                </Accordion.Item>
                <Accordion.Item value={t`Web UI`}>
                    <Accordion.Control>{t`Web UI`}</Accordion.Control>
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
