import React from 'react';

import { t } from '@lingui/macro';

import { Accordion, Select, Switch, TextInput } from '@mantine/core';

import {
    TorrentManagementCategoryChangedNameMapping,
    TorrentManagementModeNameMapping,
    TorrentManagementPathChangedNameMapping,
} from 'meridian/models';
import { getKeyForRecordValue } from 'meridian/utils';

import { SectionProps } from '../types';

const SavingManagementSection = ({ preferences, updatePreferencesKey }: SectionProps) => {
    const [localState, setLocalState] = React.useState({
        copyFilesToEnabled: preferences?.export_dir !== undefined && preferences.export_dir !== '',
        copyFinishedFilesToEnabled:
            preferences?.export_dir_fin !== undefined && preferences.export_dir_fin !== '',
    });
    return (
        <Accordion.Panel>
            <Select
                label={t`Default Torrent Management Mode`}
                value={TorrentManagementModeNameMapping[preferences?.auto_tmm_enabled ? 1 : 0]}
                data={Object.values(TorrentManagementModeNameMapping)}
                onChange={(value) =>
                    updatePreferencesKey(
                        'auto_tmm_enabled',
                        getKeyForRecordValue(TorrentManagementModeNameMapping, value) === '1',
                    )
                }
            />
            <Select
                mt='md'
                label={t`When Torrent Category changed`}
                value={
                    TorrentManagementCategoryChangedNameMapping[
                        preferences?.torrent_changed_tmm_enabled ? 1 : 0
                    ]
                }
                data={Object.values(TorrentManagementCategoryChangedNameMapping)}
                onChange={(value) =>
                    updatePreferencesKey(
                        'torrent_changed_tmm_enabled',
                        getKeyForRecordValue(TorrentManagementCategoryChangedNameMapping, value) ===
                            '1',
                    )
                }
            />
            <Select
                mt='md'
                label={t`When Default Save Path changed`}
                value={
                    TorrentManagementPathChangedNameMapping[
                        preferences?.save_path_changed_tmm_enabled ? 1 : 0
                    ]
                }
                data={Object.values(TorrentManagementPathChangedNameMapping)}
                onChange={(value) =>
                    updatePreferencesKey(
                        'save_path_changed_tmm_enabled',
                        getKeyForRecordValue(TorrentManagementPathChangedNameMapping, value) ===
                            '1',
                    )
                }
            />
            <Select
                mt='md'
                label={t`When Category Save Path changed`}
                value={
                    TorrentManagementPathChangedNameMapping[
                        preferences?.category_changed_tmm_enabled ? 1 : 0
                    ]
                }
                data={Object.values(TorrentManagementPathChangedNameMapping)}
                onChange={(value) =>
                    updatePreferencesKey(
                        'category_changed_tmm_enabled',
                        getKeyForRecordValue(TorrentManagementPathChangedNameMapping, value) ===
                            '1',
                    )
                }
            />
            <TextInput
                mt='md'
                label={t`Default Save Path`}
                value={preferences?.save_path || ''}
                onChange={(value) => updatePreferencesKey('save_path', value.target.value)}
            />
            <Switch
                mt='md'
                label={t`Keep incomplete torrents in`}
                checked={preferences?.temp_path_enabled || false}
                onChange={(value) =>
                    updatePreferencesKey('temp_path_enabled', value.target.checked)
                }
            />
            <TextInput
                mt='md'
                disabled={!preferences?.temp_path_enabled}
                value={preferences?.temp_path || ''}
                onChange={(value) => updatePreferencesKey('temp_path', value.target.value)}
            />
            <Switch
                mt='md'
                label={t`Copy .torrent files to`}
                checked={localState.copyFilesToEnabled}
                onChange={(value) =>
                    setLocalState((prev) => ({
                        ...prev,
                        copyFilesToEnabled: value.target.checked,
                    }))
                }
            />
            <TextInput
                mt='md'
                disabled={!localState.copyFilesToEnabled}
                value={preferences?.export_dir || ''}
                onChange={(value) => updatePreferencesKey('export_dir', value.target.value)}
            />
            <Switch
                mt='md'
                label={t`Copy .torrent files for finished downloads to`}
                checked={localState.copyFinishedFilesToEnabled}
                onChange={(value) =>
                    setLocalState((prev) => ({
                        ...prev,
                        copyFinishedFilesToEnabled: value.target.checked,
                    }))
                }
            />
            <TextInput
                mt='md'
                disabled={!localState.copyFinishedFilesToEnabled}
                value={preferences?.export_dir_fin || ''}
                onChange={(value) => updatePreferencesKey('export_dir_fin', value.target.value)}
            />
        </Accordion.Panel>
    );
};

export default SavingManagementSection;
