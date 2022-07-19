import { Category } from './category';
import { Peer } from './peer';
import { TorrentInfo } from './torrent';
import { TransferInfo } from './transferInfo';

export interface SyncMainData {
    rid: number;
    full_update?: boolean;
    categories?: {
        [name: string]: Category;
    };
    categories_removed?: string[];
    server_state?: TransferInfo;
    tags?: string[];
    tags_removed?: string[];
    torrents?: {
        [hash: string]: TorrentInfo;
    };
    torrents_removed?: string[];
    trackers?: {
        [url: string]: string[];
    };
    trackers_removed: string[];
}

export interface SyncPeers {
    rid: number;
    peers: {
        [ip_and_port: string]: Peer;
    };
    peers_removed?: string[];
}
