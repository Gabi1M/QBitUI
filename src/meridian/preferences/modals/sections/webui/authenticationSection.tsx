import React from 'react';
import { t } from '@lingui/macro';
import {
    NumberInput,
    PasswordInput,
    Switch,
    Textarea,
    TextInput,
} from '@mantine/core';
import { SectionProps } from '../types';

const AuthenticationSection = ({
    preferences,
    updatePreferencesKey,
}: SectionProps) => (
    <>
        <TextInput
            autoComplete='new-password'
            label={t`Username`}
            value={preferences?.web_ui_username || ''}
            onChange={value =>
                updatePreferencesKey('web_ui_username', value.target.value)
            }
        />
        <PasswordInput
            autoComplete='new-password'
            mt='md'
            label={t`Password`}
            value={preferences?.web_ui_password || ''}
            onChange={value =>
                updatePreferencesKey('web_ui_password', value.target.value)
            }
        />
        <Switch
            mt='md'
            label={t`Bypass authentication for subnets`}
            checked={preferences?.bypass_auth_subnet_whitelist_enabled || false}
            onChange={value =>
                updatePreferencesKey(
                    'bypass_auth_subnet_whitelist_enabled',
                    value.target.checked
                )
            }
        />
        <Textarea
            mt='md'
            disabled={!preferences?.bypass_auth_subnet_whitelist_enabled}
            label={t`Bypassed subnets`}
            value={preferences?.bypass_auth_subnet_whitelist || ''}
            onChange={value =>
                updatePreferencesKey(
                    'bypass_auth_subnet_whitelist',
                    value.target.value
                )
            }
        />
        <NumberInput
            mt='md'
            label={t`Ban client after consecutive failures`}
            value={preferences?.web_ui_max_auth_fail_count || 0}
            onChange={value =>
                updatePreferencesKey(
                    'web_ui_max_auth_fail_count',
                    value as number
                )
            }
        />
        <NumberInput
            mt='md'
            label={t`Ban duration`}
            value={preferences?.web_ui_ban_duration || 0}
            onChange={value =>
                updatePreferencesKey('web_ui_ban_duration', value as number)
            }
        />
        <NumberInput
            mt='md'
            label={t`Session timeout`}
            value={preferences?.web_ui_session_timeout || 0}
            onChange={value =>
                updatePreferencesKey('web_ui_session_timeout', value as number)
            }
        />
    </>
);

export default AuthenticationSection;
