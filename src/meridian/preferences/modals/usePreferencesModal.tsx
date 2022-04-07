import React from 'react';
import { t } from '@lingui/macro';
import { Button, Switch, Text, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';
import usePreferences from './usePreferences';

const PreferencesModal = () => {
    const { onSave, preferences, updatePreferencesKey } = usePreferences();

    return (
        <>
            <Text>{t`When adding a torrent`}</Text>
            <Switch mt='md' label={t`Create subfolder for torrents with multiple files`} checked={preferences?.create_subfolder_enabled || false} onChange={value => updatePreferencesKey('create_subfolder_enabled', value.target.checked)} />
            <Switch mt='md' label={t`Do not start the download automatically`} checked={preferences?.start_paused_enabled || false} onChange={value => updatePreferencesKey('start_paused_enabled', value.target.checked)} />
            <Text mt='md'>{t`Public settings`}</Text>
            <Switch mt='md' label={t`Pre-allocate disk space for all files`} checked={preferences?.preallocate_all || false} onChange={value => updatePreferencesKey('preallocate_all', value.target.checked)} />
            <Switch mt='md' label={t`Append .!qb extension to incomplete files`} checked={preferences?.incomplete_files_ext || false} onChange={value => updatePreferencesKey('incomplete_files_ext', value.target.checked)} />
            <Text mt='md'>{t`Saving management`}</Text>
            <TextInput mt='md' label={t`Save path`} value={preferences?.save_path || ''} onChange={value => updatePreferencesKey('save_path', value.target.value)} />
            <Switch mt='md' label={t`Automatic torrent management`} checked={preferences?.auto_tmm_enabled || false} onChange={value => updatePreferencesKey('auto_tmm_enabled', value.target.checked)} />
            <Switch mt='md' label={t`Relocate torrent when category changes`} checked={preferences?.category_changed_tmm_enabled || false} onChange={value => updatePreferencesKey('category_changed_tmm_enabled', value.target.checked)} />
            <Switch mt='md' label={t`Relocate torrent when save path changes`} checked={preferences?.save_path_changed_tmm_enabled || false} onChange={value => updatePreferencesKey('save_path_changed_tmm_enabled', value.target.checked)} />
            <Switch mt='md' label={t`Relocate torrent when it changes`} checked={preferences?.torrent_changed_tmm_enabled || false} onChange={value => updatePreferencesKey('torrent_changed_tmm_enabled', value.target.checked)} />
            <Switch mt='md' label={t`Keep incomplete torrents in temporary directory`} checked={preferences?.temp_path_enabled || false} onChange={value => updatePreferencesKey('temp_path_enabled', value.target.checked)} />
            {preferences?.temp_path_enabled ? <TextInput mt='md' label={t`Keep incomplete torrents in`} value={preferences?.temp_path || ''} onChange={value => updatePreferencesKey('temp_path', value.target.value)} /> : null}
            <Switch mt='md' label={t`Autorun program when torrent finishes`} checked={preferences?.autorun_enabled || false} onChange={value => updatePreferencesKey('autorun_enabled', value.target.checked)} />
            {preferences?.autorun_enabled ? <TextInput mt='md' label={t`Autorun`} value={preferences?.autorun_program || ''} onChange={value => updatePreferencesKey('autorun_program', value.target.value)} /> : null}
            <Text mt='md'>{t`Web UI`}</Text>
            <Switch mt='md' label={t`Alternative webui`} checked={preferences?.alternative_webui_enabled || false} onChange={value => updatePreferencesKey('alternative_webui_enabled', value.target.checked)} />
            {preferences?.alternative_webui_enabled ? <TextInput mt='md' label={t`Alternative webui path`} value={preferences?.alternative_webui_path || ''} onChange={value => updatePreferencesKey('alternative_webui_path', value.target.value)} /> : null}
            <Button mt='md' fullWidth onClick={onSave}>{t`Save`}</Button>
        </>
    )
};

const usePreferencesModal = () => {
    const modals = useModals();

    return () => modals.openModal({
        title: t`Preferences`,
        children: <PreferencesModal />,
        centered: true,
    })
};

export default usePreferencesModal;