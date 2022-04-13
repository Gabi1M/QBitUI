import React from 'react';
import { t } from '@lingui/macro';
import { Switch, TextInput } from '@mantine/core';
import { SectionProps } from './types';

const SavingManagementSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <TextInput
            label={t`Save path`}
            value={preferences?.save_path || ''}
            onChange={value =>
                updatePreferencesKey('save_path', value.target.value)
            }
        />
        <Switch
            mt='md'
            label={t`Automatic torrent management`}
            checked={preferences?.auto_tmm_enabled || false}
            onChange={value =>
                updatePreferencesKey('auto_tmm_enabled', value.target.checked)
            }
        />
        <Switch
            mt='md'
            label={t`Relocate torrent when category changes`}
            checked={preferences?.category_changed_tmm_enabled || false}
            onChange={value =>
                updatePreferencesKey(
                    'category_changed_tmm_enabled',
                    value.target.checked
                )
            }
        />
        <Switch
            mt='md'
            label={t`Relocate torrent when save path changes`}
            checked={preferences?.save_path_changed_tmm_enabled || false}
            onChange={value =>
                updatePreferencesKey(
                    'save_path_changed_tmm_enabled',
                    value.target.checked
                )
            }
        />
        <Switch
            mt='md'
            label={t`Relocate torrent when it changes`}
            checked={preferences?.torrent_changed_tmm_enabled || false}
            onChange={value =>
                updatePreferencesKey(
                    'torrent_changed_tmm_enabled',
                    value.target.checked
                )
            }
        />
        <Switch
            mt='md'
            label={t`Keep incomplete torrents in temporary directory`}
            checked={preferences?.temp_path_enabled || false}
            onChange={value =>
                updatePreferencesKey('temp_path_enabled', value.target.checked)
            }
        />
        {preferences?.temp_path_enabled ? (
            <TextInput
                mt='md'
                label={t`Keep incomplete torrents in`}
                value={preferences?.temp_path || ''}
                onChange={value =>
                    updatePreferencesKey('temp_path', value.target.value)
                }
            />
        ) : null}
        <Switch
            mt='md'
            label={t`Autorun program when torrent finishes`}
            checked={preferences?.autorun_enabled || false}
            onChange={value =>
                updatePreferencesKey('autorun_enabled', value.target.checked)
            }
        />
        {preferences?.autorun_enabled ? (
            <TextInput
                mt='md'
                label={t`Autorun`}
                value={preferences?.autorun_program || ''}
                onChange={value =>
                    updatePreferencesKey('autorun_program', value.target.value)
                }
            />
        ) : null}
    </>
);

export default SavingManagementSection;
