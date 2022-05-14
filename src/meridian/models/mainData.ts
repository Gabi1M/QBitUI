import { Category } from './category';
import { TransferInfo } from './transferInfo';
import { TorrentInfo } from './torrent';

export interface MainData {
    rid: number;
    full_update: boolean;
    torrents: {
        [hash: string]: TorrentInfo;
    };
    torrents_removed: string[];
    categories: {
        [name: string]: Category;
    };
    categories_removed: string[];
    tags: string[];
    tags_removed: string[];
    server_state: TransferInfo;
    trackers: {
        [url: string]: string[];
    };
}
