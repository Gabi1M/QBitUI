import React from 'react';

import { t } from '@lingui/macro';

import { Switch } from '@mantine/core';

import { SectionProps } from '../types';

const RateLimitsSettingsSection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <>
        <Switch
            label={t`Apply rate limit to µTP protocol`}
            checked={preferences?.limit_utp_rate || false}
            onChange={(value) => updatePreferencesKey('limit_utp_rate', value.target.checked)}
        />
        <Switch
            mt='md'
            label={t`Apply rate limit to transport overhead`}
            checked={preferences?.limit_tcp_overhead || false}
            onChange={(value) => updatePreferencesKey('limit_tcp_overhead', value.target.checked)}
        />
        <Switch
            mt='md'
            label={t`Apply rate limit to peers on LAN`}
            checked={preferences?.limit_lan_peers || false}
            onChange={(value) => updatePreferencesKey('limit_lan_peers', value.target.checked)}
        />
    </>
);

export default RateLimitsSettingsSection;
