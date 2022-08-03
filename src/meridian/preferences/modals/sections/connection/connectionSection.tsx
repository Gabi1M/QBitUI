import React from 'react';

import { t } from '@lingui/macro';

import { Accordion, Select } from '@mantine/core';

import { BittorrentProtocolNameMapping } from 'meridian/models';
import { getKeyForRecordValue } from 'meridian/utils';

import { SectionProps } from '../types';

import ConnectionLimitsSection from './connectionLimitsSection';
import IpFilteringSection from './ipFilteringSection';
import ListeningPortSection from './listeningPortSection';
import ProxyServerSection from './proxyServerSection';

const ConnectionSection = (props: SectionProps) => {
    const { preferences, updatePreferencesKey } = props;
    return (
        <Accordion.Panel>
            <Select
                label={t`Peer connection protocol`}
                value={BittorrentProtocolNameMapping[preferences?.bittorrent_protocol as number]}
                data={Object.values(BittorrentProtocolNameMapping)}
                onChange={(value) =>
                    updatePreferencesKey(
                        'bittorrent_protocol',
                        getKeyForRecordValue(BittorrentProtocolNameMapping, value),
                    )
                }
            />
            <Accordion mt='md' multiple variant='separated' radius='xl'>
                <Accordion.Item value={t`Listening Port`}>
                    <Accordion.Control>{t`Listening Port`}</Accordion.Control>
                    <ListeningPortSection {...props} />
                </Accordion.Item>
                <Accordion.Item value={t`Connection Limits`}>
                    <Accordion.Control>{t`Connection Limits`}</Accordion.Control>
                    <ConnectionLimitsSection {...props} />
                </Accordion.Item>
                <Accordion.Item value={t`Proxy Server`}>
                    <Accordion.Control>{t`Proxy Server`}</Accordion.Control>
                    <ProxyServerSection {...props} />
                </Accordion.Item>
                <Accordion.Item value={t`IP Filtering`}>
                    <Accordion.Control>{t`IP Filtering`}</Accordion.Control>
                    <IpFilteringSection {...props} />
                </Accordion.Item>
            </Accordion>
        </Accordion.Panel>
    );
};

export default ConnectionSection;
