import React from 'react';

import { t } from '@lingui/macro';

import { PasswordInput, Switch, TextInput } from '@mantine/core';

import { SectionProps } from '../types';

const EmailSection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <>
        <Switch
            label={t`Enabled`}
            checked={preferences?.mail_notification_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('mail_notification_enabled', value.target.checked)
            }
        />
        <TextInput
            mt='md'
            label={t`From`}
            disabled={!preferences?.mail_notification_enabled}
            value={preferences?.mail_notification_sender || ''}
            onChange={(value) =>
                updatePreferencesKey('mail_notification_sender', value.target.value)
            }
        />
        <TextInput
            mt='md'
            label={t`To`}
            disabled={!preferences?.mail_notification_enabled}
            value={preferences?.mail_notification_email || ''}
            onChange={(value) =>
                updatePreferencesKey('mail_notification_email', value.target.value)
            }
        />
        <TextInput
            mt='md'
            label={t`SMTP server`}
            disabled={!preferences?.mail_notification_enabled}
            value={preferences?.mail_notification_smtp || ''}
            onChange={(value) => updatePreferencesKey('mail_notification_smtp', value.target.value)}
        />
        <Switch
            mt='md'
            label={t`This server requires a secure connection (SSL)`}
            disabled={!preferences?.mail_notification_enabled}
            checked={preferences?.mail_notification_ssl_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('mail_notification_ssl_enabled', value.target.checked)
            }
        />
        <Switch
            mt='md'
            label={t`Authentication`}
            disabled={!preferences?.mail_notification_enabled}
            checked={preferences?.mail_notification_auth_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('mail_notification_auth_enabled', value.target.checked)
            }
        />
        <TextInput
            autoComplete='new-password'
            mt='md'
            disabled={
                !preferences?.mail_notification_enabled ||
                !preferences.mail_notification_auth_enabled
            }
            label={t`Username`}
            value={preferences?.mail_notification_username || ''}
            onChange={(value) =>
                updatePreferencesKey('mail_notification_username', value.target.value)
            }
        />
        <PasswordInput
            autoComplete='new-password'
            mt='md'
            disabled={
                !preferences?.mail_notification_enabled ||
                !preferences.mail_notification_auth_enabled
            }
            label={t`Password`}
            value={preferences?.mail_notification_password || ''}
            onChange={(value) =>
                updatePreferencesKey('mail_notification_password', value.target.value)
            }
        />
    </>
);

export default EmailSection;
