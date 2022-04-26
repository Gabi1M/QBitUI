import React from 'react';
import { t } from '@lingui/macro';
import { NumberInput } from '@mantine/core';
import { SectionProps } from '../types';

const AlternativeRateLimitsSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <NumberInput
            label={t`Upload`}
            value={preferences?.alt_up_limit || 0}
            onChange={value =>
                updatePreferencesKey('alt_up_limit', value as number)
            }
        />
        <NumberInput
            mt='md'
            label={t`Download`}
            value={preferences?.alt_dl_limit || 0}
            onChange={value =>
                updatePreferencesKey('alt_dl_limit', value as number)
            }
        />
    </>
);

export default AlternativeRateLimitsSection;
