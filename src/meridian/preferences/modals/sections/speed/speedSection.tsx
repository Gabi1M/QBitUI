import React from 'react';

import { t } from '@lingui/macro';

import { Accordion } from '@mantine/core';

import { SectionProps } from '../types';

import AlternativeRateLimitsSection from './alternativeRateLimitsSection';
import GlobalRateLimitsSection from './globalRateLimitsSection';
import RateLimitsSettingsSection from './rateLimitsSettingsSection';

const SpeedSection = (props: SectionProps) => (
    <Accordion.Panel>
        <Accordion multiple variant='separated' radius='xl'>
            <Accordion.Item value={t`Global Rate Limits`}>
                <Accordion.Control>{t`Global Rate Limits`}</Accordion.Control>
                <GlobalRateLimitsSection {...props} />
            </Accordion.Item>
            <Accordion.Item value={t`Alternative Rate Limits`}>
                <Accordion.Control>{t`Alternative Rate Limits`}</Accordion.Control>
                <AlternativeRateLimitsSection {...props} />
            </Accordion.Item>
            <Accordion.Item value={t`Rate Limits Settings`}>
                <Accordion.Control>{t`Rate Limits Settings`}</Accordion.Control>
                <RateLimitsSettingsSection {...props} />
            </Accordion.Item>
        </Accordion>
    </Accordion.Panel>
);

export default SpeedSection;
