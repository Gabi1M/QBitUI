import React from 'react';
import { t } from '@lingui/macro';
import { NumberInput, Select, Switch } from '@mantine/core';
import { BitTorrentMaxRatioActNameMaping } from 'meridian/models';
import { getKeyForRecordValue } from 'meridian/utils';
import { SectionProps } from '../types';

const SeedingLimitsSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <Switch
            label={t`When ratio reaches`}
            checked={preferences?.max_ratio_enabled || false}
            onChange={value =>
                updatePreferencesKey('max_ratio_enabled', value.target.checked)
            }
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.max_ratio_enabled}
            value={preferences?.max_ratio || 0}
            onChange={value =>
                updatePreferencesKey('max_ratio', value as number)
            }
        />
        <Switch
            mt='md'
            label={t`When seeding time reaches`}
            checked={preferences?.max_seeding_time_enabled || false}
            onChange={value =>
                updatePreferencesKey(
                    'max_seeding_time_enabled',
                    value.target.checked
                )
            }
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.max_seeding_time_enabled}
            value={preferences?.max_seeding_time || 0}
            onChange={value =>
                updatePreferencesKey('max_seeding_time', value as number)
            }
        />
        <Select
            mt='md'
            label={t`Then`}
            disabled={
                !preferences?.max_ratio_enabled &&
                !preferences?.max_seeding_time_enabled
            }
            value={
                BitTorrentMaxRatioActNameMaping[
                    preferences?.max_ratio_act as number
                ]
            }
            data={Object.values(BitTorrentMaxRatioActNameMaping)}
            onChange={value =>
                updatePreferencesKey(
                    'max_ratio_act',
                    getKeyForRecordValue(BitTorrentMaxRatioActNameMaping, value)
                )
            }
        />
    </>
);

export default SeedingLimitsSection;
