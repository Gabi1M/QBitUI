import React from 'react';
import { t } from '@lingui/macro';
import { NumberInput, Switch } from '@mantine/core';
import { SectionProps } from '../types';

const QueueingSection = ({ preferences, updatePreferencesKey }: SectionProps) => (
    <>
        <Switch
            label={t`Enabled`}
            checked={preferences?.queueing_enabled || false}
            onChange={(value) => updatePreferencesKey('queueing_enabled', value.target.checked)}
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.queueing_enabled}
            label={t`Maximum active downloads`}
            value={preferences?.max_active_downloads || 0}
            onChange={(value) => updatePreferencesKey('max_active_downloads', value as number)}
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.queueing_enabled}
            label={t`Maximum active uploads`}
            value={preferences?.max_active_uploads || 0}
            onChange={(value) => updatePreferencesKey('max_active_uploads', value as number)}
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.queueing_enabled}
            label={t`Maximum active torrents`}
            value={preferences?.max_active_torrents || 0}
            onChange={(value) => updatePreferencesKey('max_active_torrents', value as number)}
        />
        <Switch
            mt='md'
            disabled={!preferences?.queueing_enabled}
            label={t`Do not count slow torrents in these limits`}
            checked={preferences?.dont_count_slow_torrents || false}
            onChange={(value) =>
                updatePreferencesKey('dont_count_slow_torrents', value.target.checked)
            }
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.queueing_enabled || !preferences?.dont_count_slow_torrents}
            label={t`Download rate threshold`}
            value={preferences?.slow_torrent_dl_rate_threshold || 0}
            onChange={(value) =>
                updatePreferencesKey('slow_torrent_dl_rate_threshold', value as number)
            }
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.queueing_enabled || !preferences?.dont_count_slow_torrents}
            label={t`Upload rate threshold`}
            value={preferences?.slow_torrent_ul_rate_threshold || 0}
            onChange={(value) =>
                updatePreferencesKey('slow_torrent_ul_rate_threshold', value as number)
            }
        />
        <NumberInput
            mt='md'
            disabled={!preferences?.queueing_enabled || !preferences?.dont_count_slow_torrents}
            label={t`Torrent inactivity timer`}
            value={preferences?.slow_torrent_inactive_timer || 0}
            onChange={(value) =>
                updatePreferencesKey('slow_torrent_inactive_timer', value as number)
            }
        />
    </>
);

export default QueueingSection;
