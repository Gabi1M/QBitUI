import React from 'react';

import { t } from '@lingui/macro';

import { Accordion, Switch, TextInput, Textarea } from '@mantine/core';

import { SectionProps } from '../types';

const IpFilteringSection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <Accordion.Panel>
        <TextInput
            label={t`Filter path`}
            value={preferences?.ip_filter_path || ''}
            onChange={(value) => updatePreferencesKey('ip_filter_path', value.target.value)}
        />
        <Switch
            mt='md'
            label={t`Apply to trackers`}
            checked={preferences?.ip_filter_trackers || false}
            onChange={(value) => updatePreferencesKey('ip_filter_trackers', value.target.checked)}
        />
        <Textarea
            mt='md'
            label={t`Manually banned IP addresses`}
            value={preferences?.banned_IPs || ''}
            onChange={(value) => updatePreferencesKey('banned_IPs', value.target.value)}
        />
    </Accordion.Panel>
);

export default IpFilteringSection;
