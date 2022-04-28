import React from 'react';
import { t } from '@lingui/macro';
import { Accordion } from '@mantine/core';
import { SectionProps } from '../types';
import GlobalRateLimitsSection from './globalRateLimitsSection';
import AlternativeRateLimitsSection from './alternativeRateLimitsSection';
import RateLimitsSettingsSection from './rateLimitsSettingsSection';

const SpeedSection = (props: SectionProps) => (
    <Accordion multiple offsetIcon={false}>
        <Accordion.Item label={t`Global Rate Limits`}>
            <GlobalRateLimitsSection {...props} />
        </Accordion.Item>
        <Accordion.Item label={t`Alternative Rate Limits`}>
            <AlternativeRateLimitsSection {...props} />
        </Accordion.Item>
        <Accordion.Item label={t`Rate Limits Settings`}>
            <RateLimitsSettingsSection {...props} />
        </Accordion.Item>
    </Accordion>
);

export default SpeedSection;
