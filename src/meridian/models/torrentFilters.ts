import { TorrentStateDescription } from './torrent';

export interface TorrentFilters {
    name: string;
    states: TorrentStateDescription[];
    categories: string[];
    tags: string[];
}
