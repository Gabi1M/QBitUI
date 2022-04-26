import React from 'react';
import { t } from '@lingui/macro';
import { PasswordInput, Switch, Textarea, TextInput } from '@mantine/core';
import { SectionProps } from './types';

const WebUiSection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <>
        <Switch
            label={t`Alternative webui`}
            checked={preferences?.alternative_webui_enabled || false}
            onChange={value =>
                updatePreferencesKey(
                    'alternative_webui_enabled',
                    value.target.checked
                )
            }
        />
        {preferences?.alternative_webui_enabled ? (
            <TextInput
                mt='md'
                label={t`Alternative webui path`}
                value={preferences?.alternative_webui_path || ''}
                onChange={value =>
                    updatePreferencesKey(
                        'alternative_webui_path',
                        value.target.value
                    )
                }
            />
        ) : null}
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
        {preferences?.bypass_auth_subnet_whitelist_enabled ? (
            <TextInput
                mt='md'
                label={t`Bypassed subnets`}
                value={preferences?.bypass_auth_subnet_whitelist || ''}
                onChange={value =>
                    updatePreferencesKey(
                        'bypass_auth_subnet_whitelist',
                        value.target.value
                    )
                }
            />
        ) : null}
        <Switch
            mt='md'
            label={t`Add custom HTTP headers`}
            checked={
                preferences?.web_ui_use_custom_http_headers_enabled || false
            }
            onChange={value =>
                updatePreferencesKey(
                    'web_ui_use_custom_http_headers_enabled',
                    value.target.checked
                )
            }
        />
        {preferences?.web_ui_use_custom_http_headers_enabled ? (
            <Textarea
                mt='md'
                label={t`Custom HTTP headers`}
                value={preferences?.web_ui_custom_http_headers || ''}
                onChange={value =>
                    updatePreferencesKey(
                        'web_ui_custom_http_headers',
                        value.target.value
                    )
                }
            />
        ) : null}
        <TextInput
            autoComplete='new-password'
            mt='md'
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
    </>
);

export default WebUiSection;
