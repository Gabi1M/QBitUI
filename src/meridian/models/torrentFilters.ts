import { TorrentState } from './torrent';

export interface TorrentFilters {
    name: string;
    states: TorrentState[];
    categories: string[];
    tags: string[];
}
