import React from 'react';
import { t } from '@lingui/macro';
import { Accordion, Select } from '@mantine/core';
import { BittorrentProtocolNameMapping } from 'meridian/models';
import { getKeyForRecordValue } from 'meridian/utils';
import { SectionProps } from '../types';
import ListeningPortSection from './listeningPortSection';
import ConnectionLimitsSection from './connectionLimitsSection';
import ProxyServerSection from './proxyServerSection';
import IpFilteringSection from './ipFilteringSection';

const ConnectionSection = (props: SectionProps) => {
    const { preferences, updatePreferencesKey } = props;
    return (
        <>
            <Select
                label={t`Peer connection protocol`}
                value={
                    BittorrentProtocolNameMapping[
                        preferences?.bittorrent_protocol as number
                    ]
                }
                data={Object.values(BittorrentProtocolNameMapping)}
                onChange={value =>
                    updatePreferencesKey(
                        'bittorrent_protocol',
                        getKeyForRecordValue(
                            BittorrentProtocolNameMapping,
                            value
                        )
                    )
                }
            />
            <Accordion mt='md' multiple>
                <Accordion.Item label={t`Listening Port`}>
                    <ListeningPortSection {...props} />
                </Accordion.Item>
                <Accordion.Item label={t`Connection Limits`}>
                    <ConnectionLimitsSection {...props} />
                </Accordion.Item>
                <Accordion.Item label={t`Proxy Server`}>
                    <ProxyServerSection {...props} />
                </Accordion.Item>
                <Accordion.Item label={t`IP Filtering`}>
                    <IpFilteringSection {...props} />
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default ConnectionSection;
