import React from 'react';
import { t } from '@lingui/macro';
import { Accordion, Switch, Textarea } from '@mantine/core';
import { SectionProps } from '../types';
import AddingTorrentSection from './addingTorrentSection';
import SavingManagementSection from './savingManagementSection';
import EmailSection from './emailSection';

const DownloadsSection = (props: SectionProps) => {
    const { preferences, updatePreferencesKey } = props;
    return (
        <>
            <Switch
                label={t`Pre-allocate disk space for all files`}
                checked={preferences?.preallocate_all || false}
                onChange={value =>
                    updatePreferencesKey(
                        'preallocate_all',
                        value.target.checked
                    )
                }
            />
            <Switch
                mt='md'
                label={t`Append .!qB extension to incomplete files`}
                checked={preferences?.incomplete_files_ext || false}
                onChange={value =>
                    updatePreferencesKey(
                        'incomplete_files_ext',
                        value.target.checked
                    )
                }
            />
            <Switch
                mt='md'
                label={t`Autorun program when torrent finishes`}
                checked={preferences?.autorun_enabled || false}
                onChange={value =>
                    updatePreferencesKey(
                        'autorun_enabled',
                        value.target.checked
                    )
                }
            />
            <Textarea
                mt='md'
                disabled={!preferences?.autorun_enabled}
                value={preferences?.autorun_program || ''}
                onChange={value =>
                    updatePreferencesKey('autorun_program', value.target.value)
                }
            />
            <Accordion mt='md' multiple offsetIcon={false}>
                <Accordion.Item label={t`When adding a torrent`}>
                    <AddingTorrentSection {...props} />
                </Accordion.Item>
                <Accordion.Item label={t`Saving Management`}>
                    <SavingManagementSection {...props} />
                </Accordion.Item>
                <Accordion.Item
                    label={t`Email notification upon download completion`}
                >
                    <EmailSection {...props} />
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default DownloadsSection;
