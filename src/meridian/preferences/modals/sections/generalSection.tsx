import React from 'react';
import { t } from '@lingui/macro';
import { Switch } from '@mantine/core';
import { SectionProps } from './types';

const GeneralSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <Switch
            label={t`Pre-allocate disk space for all files`}
            checked={preferences?.preallocate_all || false}
            onChange={value =>
                updatePreferencesKey('preallocate_all', value.target.checked)
            }
        />
        <Switch
            mt='md'
            label={t`Append .!qb extension to incomplete files`}
            checked={preferences?.incomplete_files_ext || false}
            onChange={value =>
                updatePreferencesKey(
                    'incomplete_files_ext',
                    value.target.checked
                )
            }
        />
    </>
);

export default GeneralSection;
