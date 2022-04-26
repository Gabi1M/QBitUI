import React from 'react';
import { t } from '@lingui/macro';
import { Switch, TextInput } from '@mantine/core';
import { SectionProps } from '../types';

const ListeningPortSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <TextInput
            label={t`Port used for incoming connections`}
            value={preferences?.listen_port || ''}
            onChange={value =>
                updatePreferencesKey('listen_port', value.target.value)
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
