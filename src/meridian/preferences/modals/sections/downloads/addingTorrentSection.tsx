import React from 'react';
import { t } from '@lingui/macro';
import { Switch } from '@mantine/core';
import { SectionProps } from '../types';

const AddingTorrentSection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <>
        <Switch
            label={t`Do not start the download automatically`}
            checked={preferences?.start_paused_enabled || false}
            onChange={(value) => updatePreferencesKey('start_paused_enabled', value.target.checked)}
        />
        <Switch
            mt='md'
            label={t`Create subfolder for torrents with multiple files`}
            checked={preferences?.create_subfolder_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('create_subfolder_enabled', value.target.checked)
            }
        />
    </>
);

export default AddingTorrentSection;
