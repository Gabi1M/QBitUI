import React from 'react';
import { t } from '@lingui/macro';
import { NumberInput, Switch } from '@mantine/core';
import { SectionProps } from '../types';

const ListeningPortSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <NumberInput
            label={t`Port used for incoming connections`}
            value={preferences?.listen_port || 0}
            onChange={value =>
                updatePreferencesKey('listen_port', value as number)
            }
        />
        <Switch
            mt='md'
            label={t`Use UPnP / NAT-PMP port forwarding from my router`}
            checked={preferences?.upnp || false}
            onChange={value =>
                updatePreferencesKey('upnp', value.target.checked)
            }
        />
    </>
);

export default ListeningPortSection;
