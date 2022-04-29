import { DefaultMantineColor } from '@mantine/core';
import { Language } from 'meridian/i18n/types';
import { TorrentState } from './torrent';

export interface Settings {
    darkMode: boolean;
    autoRefresh: boolean;
    autoRefreshInterval: number;
    torrentsPerPage: number;
    language: Language;
    torrentStateColors: Record<TorrentState, DefaultMantineColor>;
}
