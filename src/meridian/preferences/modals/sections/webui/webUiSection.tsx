import React from 'react';
import { t } from '@lingui/macro';
import {
    Accordion,
    NumberInput,
    Switch,
    Textarea,
    TextInput,
} from '@mantine/core';
import { SectionProps } from '../types';
import AuthenticationSection from './authenticationSection';
import SecuritySection from './securitySection';

const WebUiSection = (props: SectionProps) => {
    const { preferences, updatePreferencesKey } = props;
    return (
        <>
            <Switch
                label={t`Use alternative Web UI`}
                checked={preferences?.alternative_webui_enabled || false}
                onChange={value =>
                    updatePreferencesKey(
                        'alternative_webui_enabled',
                        value.target.checked
                    )
                }
            />
            <TextInput
                mt='md'
                disabled={!preferences?.alternative_webui_enabled}
                label={t`Files location`}
                value={preferences?.alternative_webui_path || ''}
                onChange={value =>
                    updatePreferencesKey(
                        'alternative_webui_path',
                        value.target.value
                    )
                }
            />
            <TextInput
                mt='md'
                label={t`IP address`}
                value={preferences?.web_ui_address || ''}
                onChange={value =>
                    updatePreferencesKey('web_ui_address', value.target.value)
                }
            />
            <NumberInput
                mt='md'
                label={t`Port`}
                value={preferences?.web_ui_port || 0}
                onChange={value =>
                    updatePreferencesKey('web_ui_port', value as number)
                }
            />
            <Switch
                mt='md'
                label={t`Use UPnP / NAT-PMP to forward the port from my router`}
                checked={preferences?.web_ui_upnp || false}
                onChange={value =>
                    updatePreferencesKey('web_ui_upnp', value.target.checked)
                }
            />
            <Switch
                mt='md'
                label={t`Use HTTPS instead of HTTP`}
                checked={preferences?.use_https || false}
                onChange={value =>
                    updatePreferencesKey('use_https', value.target.checked)
                }
            />
            <TextInput
                mt='md'
                disabled={!preferences?.use_https}
                label={t`Certificate`}
                value={preferences?.web_ui_https_cert_path || ''}
                onChange={value =>
                    updatePreferencesKey(
                        'web_ui_https_cert_path',
                        value.target.value
                    )
                }
            />
            <TextInput
                mt='md'
                disabled={!preferences?.use_https}
                label={t`Key`}
                value={preferences?.web_ui_https_key_path || ''}
                onChange={value =>
                    updatePreferencesKey(
                        'web_ui_https_key_path',
                        value.target.value
                    )
                }
            />
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
            <Textarea
                mt='md'
                disabled={!preferences?.web_ui_use_custom_http_headers_enabled}
                value={preferences?.web_ui_custom_http_headers || ''}
                onChange={value =>
                    updatePreferencesKey(
                        'web_ui_custom_http_headers',
                        value.target.value
                    )
                }
            />

            <Accordion mt='md' multiple offsetIcon={false}>
                <Accordion.Item label={t`Authentication`}>
                    <AuthenticationSection {...props} />
                </Accordion.Item>
                <Accordion.Item label={t`Security`}>
                    <SecuritySection {...props} />
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default WebUiSection;
