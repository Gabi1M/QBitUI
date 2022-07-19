import React from 'react';

import { t } from '@lingui/macro';

import { Switch, Textarea } from '@mantine/core';

import { SectionProps } from '../types';

const SecuritySection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <>
        <Switch
            label={t`Enable clickjacking protection`}
            checked={preferences?.web_ui_clickjacking_protection_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('web_ui_clickjacking_protection_enabled', value.target.checked)
            }
        />
        <Switch
            mt='md'
            label={t`Enable Cross-Site Request Forgery (CSRF) protection`}
            checked={preferences?.web_ui_csrf_protection_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('web_ui_csrf_protection_enabled', value.target.checked)
            }
        />
        <Switch
            mt='md'
            disabled={!preferences?.use_https}
            label={t`Enable cookie Secure flag (requires HTTPS)`}
            checked={preferences?.web_ui_secure_cookie_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('web_ui_secure_cookie_enabled', value.target.checked)
            }
        />
        <Switch
            mt='md'
            label={t`Enable Host header validation`}
            checked={preferences?.web_ui_host_header_validation_enabled || false}
            onChange={(value) =>
                updatePreferencesKey('web_ui_host_header_validation_enabled', value.target.checked)
            }
        />
        <Textarea
            mt='md'
            disabled={!preferences?.web_ui_host_header_validation_enabled}
            label={t`Server domains`}
            value={preferences?.web_ui_domain_list || ''}
            onChange={(value) => updatePreferencesKey('web_ui_domain_list', value.target.value)}
        />
    </>
);

export default SecuritySection;
