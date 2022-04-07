import { Category } from './category';
import { TransferInfo } from './transferInfo';
import { TorrentInfo } from './torrent';

export interface MainData {
    categories: {
        [name: string]: Category;
    };
    server_state: TransferInfo;
    tags: string[];
    torrents: {
        [hash: string]: TorrentInfo;
    };
    trackers: {
        [url: string]: string[];
    };
}
