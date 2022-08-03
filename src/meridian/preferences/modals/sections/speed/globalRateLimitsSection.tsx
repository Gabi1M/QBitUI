import React from 'react';

import { t } from '@lingui/macro';

import { Accordion, NumberInput } from '@mantine/core';

import { SectionProps } from '../types';

const GlobalRateLimitsSection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <Accordion.Panel>
        <NumberInput
            label={t`Upload`}
            value={preferences?.up_limit || 0}
            onChange={(value) => updatePreferencesKey('up_limit', value as number)}
        />
        <NumberInput
            mt='md'
            label={t`Download`}
            value={preferences?.dl_limit || 0}
            onChange={(value) => updatePreferencesKey('dl_limit', value as number)}
        />
    </Accordion.Panel>
);

export default GlobalRateLimitsSection;
