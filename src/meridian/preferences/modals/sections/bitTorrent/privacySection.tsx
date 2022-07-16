import React from 'react';
import { t } from '@lingui/macro';
import { Select, Switch } from '@mantine/core';
import { BitTorrentEncryptionNameMapping } from 'meridian/models';
import { getKeyForRecordValue } from 'meridian/utils';
import { SectionProps } from '../types';

const PrivacySection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <>
        <Switch
            label={t`Enable DHT (decentralized network) to find more peers`}
            checked={preferences?.dht || false}
            onChange={(value) => updatePreferencesKey('dht', value.target.checked)}
        />
        <Switch
            mt='md'
            label={t`Enable Peer Exchange (PeX) to find more peers`}
            checked={preferences?.pex || false}
            onChange={(value) => updatePreferencesKey('pex', value.target.checked)}
        />
        <Switch
            mt='md'
            label={t`Enable Local Peer Discovery to find more peers`}
            checked={preferences?.lsd || false}
            onChange={(value) => updatePreferencesKey('lsd', value.target.checked)}
        />
        <Select
            mt='md'
            label={t`Encryption mode`}
            value={BitTorrentEncryptionNameMapping[preferences?.encryption as number]}
            data={Object.values(BitTorrentEncryptionNameMapping)}
            onChange={(value) =>
                updatePreferencesKey(
                    'encryption',
                    getKeyForRecordValue(BitTorrentEncryptionNameMapping, value),
                )
            }
        />
        <Switch
            mt='md'
            label={t`Enable anonymous mode`}
            checked={preferences?.anonymous_mode || false}
            onChange={(value) => updatePreferencesKey('anonymous_mode', value.target.checked)}
        />
    </>
);

export default PrivacySection;
