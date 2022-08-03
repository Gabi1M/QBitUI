import React from 'react';

import { t } from '@lingui/macro';

import { Accordion, Switch, Textarea } from '@mantine/core';

import { SectionProps } from '../types';

import AddingTorrentSection from './addingTorrentSection';
import EmailSection from './emailSection';
import SavingManagementSection from './savingManagementSection';

const DownloadsSection = (props: SectionProps) => {
    const { preferences, updatePreferencesKey } = props;
    return (
        <Accordion.Panel>
            <Switch
                label={t`Pre-allocate disk space for all files`}
                checked={preferences?.preallocate_all || false}
                onChange={(value) => updatePreferencesKey('preallocate_all', value.target.checked)}
            />
            <Switch
                mt='md'
                label={t`Append .!qB extension to incomplete files`}
                checked={preferences?.incomplete_files_ext || false}
                onChange={(value) =>
                    updatePreferencesKey('incomplete_files_ext', value.target.checked)
                }
            />
            <Switch
                mt='md'
                label={t`Autorun program when torrent finishes`}
                checked={preferences?.autorun_enabled || false}
                onChange={(value) => updatePreferencesKey('autorun_enabled', value.target.checked)}
            />
            <Textarea
                mt='md'
                disabled={!preferences?.autorun_enabled}
                value={preferences?.autorun_program || ''}
                onChange={(value) => updatePreferencesKey('autorun_program', value.target.value)}
            />
            <Accordion mt='md' multiple variant='separated' radius='xl'>
                <Accordion.Item value={t`When adding a torrent`}>
                    <Accordion.Control>{t`When adding a torrent`}</Accordion.Control>
                    <AddingTorrentSection {...props} />
                </Accordion.Item>
                <Accordion.Item value={t`Saving Management`}>
                    <Accordion.Control>{t`Saving Management`}</Accordion.Control>
                    <SavingManagementSection {...props} />
                </Accordion.Item>
                <Accordion.Item value={t`Email notification upon download completion`}>
                    <Accordion.Control>{t`Email notification upon download completion`}</Accordion.Control>
                    <EmailSection {...props} />
                </Accordion.Item>
            </Accordion>
        </Accordion.Panel>
    );
};

export default DownloadsSection;
