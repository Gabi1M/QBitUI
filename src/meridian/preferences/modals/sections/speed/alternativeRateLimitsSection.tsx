import React from 'react';
import { t } from '@lingui/macro';
import { Box, createStyles, NumberInput, Select, Switch } from '@mantine/core';
import { SchedulerDayNameMapping } from 'meridian/models';
import { getKeyForRecordValue } from 'meridian/utils';
import { TimeInput } from '@mantine/dates';
import { SectionProps } from '../types';

const createDate = (hours: number, minutes: number) => {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
};

const AlternativeRateLimitsSection = ({
    preferences,
    updatePreferencesKey,
    updateBulkPreferencesKey,
}: SectionProps) => {
    const styles = useStyles();
    const fromDate = createDate(
        preferences?.schedule_from_hour || 0,
        preferences?.schedule_from_min || 0,
    );
    const toDate = createDate(
        preferences?.schedule_to_hour || 0,
        preferences?.schedule_to_min || 0,
    );

    const updateTime = (value: Date, key: 'from' | 'to') => {
        updateBulkPreferencesKey([
            {
                name: key === 'from' ? 'schedule_from_hour' : 'schedule_to_hour',
                value: value.getHours(),
            },
            {
                name: key === 'from' ? 'schedule_from_min' : 'schedule_to_min',
                value: value.getMinutes(),
            },
        ]);
    };

    return (
        <>
            <NumberInput
                label={t`Upload`}
                value={preferences?.alt_up_limit || 0}
                onChange={(value) => updatePreferencesKey('alt_up_limit', value as number)}
            />
            <NumberInput
                mt='md'
                label={t`Download`}
                value={preferences?.alt_dl_limit || 0}
                onChange={(value) => updatePreferencesKey('alt_dl_limit', value as number)}
            />
            <Switch
                mt='md'
                label={t`Schedule the use of alternative rate limits`}
                checked={preferences?.scheduler_enabled || false}
                onChange={(value) =>
                    updatePreferencesKey('scheduler_enabled', value.target.checked)
                }
            />
            <Box mt='md' className={styles.classes.container}>
                <TimeInput
                    mr='sm'
                    label={t`From`}
                    value={fromDate}
                    onChange={(value) => updateTime(value, 'from')}
                />
                <TimeInput
                    label={t`To`}
                    value={toDate}
                    onChange={(value) => updateTime(value, 'to')}
                />
            </Box>
            <Select
                mt='md'
                label={t`When`}
                value={SchedulerDayNameMapping[preferences?.scheduler_days as number]}
                data={Object.values(SchedulerDayNameMapping)}
                onChange={(value) =>
                    updatePreferencesKey(
                        'scheduler_days',
                        getKeyForRecordValue(SchedulerDayNameMapping, value),
                    )
                }
            />
        </>
    );
};

const useStyles = createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export default AlternativeRateLimitsSection;
