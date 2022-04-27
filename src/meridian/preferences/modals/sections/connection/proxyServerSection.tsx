import React from 'react';
import { t } from '@lingui/macro';
import {
    NumberInput,
    PasswordInput,
    Select,
    Switch,
    TextInput,
} from '@mantine/core';
import { ProxyTypeNameMapping } from 'meridian/models';
import { getKeyForRecordValue } from 'meridian/utils';
import { SectionProps } from '../types';

const ProxyServerSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <Select
            label={t`Type`}
            value={ProxyTypeNameMapping[preferences?.proxy_type as number]}
            data={Object.values(ProxyTypeNameMapping)}
            onChange={value =>
                updatePreferencesKey(
                    'proxy_type',
                    getKeyForRecordValue(ProxyTypeNameMapping, value)
                )
            }
        />
        <TextInput
            mt='md'
            label={t`Host`}
            value={preferences?.proxy_ip || ''}
            onChange={value =>
                updatePreferencesKey('proxy_ip', value.target.value)
            }
        />
        <NumberInput
            mt='md'
            label={t`Port`}
            value={preferences?.proxy_port || 0}
            onChange={value =>
                updatePreferencesKey('proxy_port', value as number)
            }
        />
        <Switch
            mt='md'
            label={t`Use proxy for peer connections`}
            checked={preferences?.proxy_peer_connections || false}
            onChange={value =>
                updatePreferencesKey(
                    'proxy_peer_connections',
                    value.target.checked
                )
            }
        />
        <Switch
            mt='md'
            label={t`Use proxy only for torrents`}
            checked={preferences?.proxy_torrents_only || false}
            onChange={value =>
                updatePreferencesKey(
                    'proxy_torrents_only',
                    value.target.checked
                )
            }
        />
        <Switch
            mt='md'
            label={t`Authentication`}
            checked={preferences?.proxy_auth_enabled || false}
            onChange={value =>
                updatePreferencesKey('proxy_auth_enabled', value.target.checked)
            }
        />
        <TextInput
            mt='md'
            label={t`Username`}
            disabled={!preferences?.proxy_auth_enabled}
            value={preferences?.proxy_username || ''}
            onChange={value =>
                updatePreferencesKey('proxy_username', value.target.value)
            }
        />
        <PasswordInput
            autoComplete='new-password'
            mt='md'
            disabled={!preferences?.proxy_auth_enabled}
            label={t`Password`}
            value={preferences?.proxy_password || ''}
            onChange={value =>
                updatePreferencesKey('proxy_password', value.target.value)
            }
        />
    </>
);

export default ProxyServerSection;
