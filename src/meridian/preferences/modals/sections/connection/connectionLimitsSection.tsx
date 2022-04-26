import React from 'react';
import { t } from '@lingui/macro';
import { NumberInput } from '@mantine/core';
import { SectionProps } from '../types';

const ConnectionLimitsSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <NumberInput
            label={t`Global maximum number of connections`}
            value={preferences?.max_connec || 0}
            onChange={value =>
                updatePreferencesKey('max_connec', value as number)
            }
        />
        <NumberInput
            mt='md'
            label={t`Maximum number of connections per torrent`}
            value={preferences?.max_connec_per_torrent || 0}
            onChange={value =>
                updatePreferencesKey('max_connec_per_torrent', value as number)
            }
        />
        <NumberInput
            mt='md'
            label={t`Global maximum number of upload slots`}
            value={preferences?.max_uploads || 0}
            onChange={value =>
                updatePreferencesKey('max_uploads', value as number)
            }
        />
        <NumberInput
            mt='md'
            label={t`Maximum number of upload slots per torrent`}
            value={preferences?.max_uploads_per_torrent || 0}
            onChange={value =>
                updatePreferencesKey('max_uploads_per_torrent', value as number)
            }
        />
    </>
);

export default ConnectionLimitsSection;
