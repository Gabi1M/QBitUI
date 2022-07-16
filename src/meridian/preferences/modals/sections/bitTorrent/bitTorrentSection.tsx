import React from 'react';

import { t } from '@lingui/macro';

import { Accordion, Switch, Textarea } from '@mantine/core';

import { SectionProps } from '../types';

import PrivacySection from './privacySection';
import QueueingSection from './queueingSection';
import SeedingLimitsSection from './seedingLimitsSection';

const BitTorrentSection = (props: SectionProps) => {
    const { preferences, updatePreferencesKey } = props;
    return (
        <>
            <Accordion multiple offsetIcon={false}>
                <Accordion.Item label={t`Privacy`}>
                    <PrivacySection {...props} />
                </Accordion.Item>
                <Accordion.Item label={t`Torrent Queueing`}>
                    <QueueingSection {...props} />
                </Accordion.Item>
                <Accordion.Item label={t`Seeding Limits`}>
                    <SeedingLimitsSection {...props} />
                </Accordion.Item>
            </Accordion>
            <Switch
                mt='md'
                label={t`Automatically add these trackers to new downloads`}
                checked={preferences?.add_trackers_enabled || false}
                onChange={(value) =>
                    updatePreferencesKey('add_trackers_enabled', value.target.checked)
                }
            />
            <Textarea
                mt='md'
                disabled={!preferences?.add_trackers_enabled}
                value={preferences?.add_trackers || ''}
                onChange={(value) => updatePreferencesKey('add_trackers', value.target.value)}
            />
        </>
    );
};

export default BitTorrentSection;
