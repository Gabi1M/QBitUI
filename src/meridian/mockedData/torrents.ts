import { TorrentInfo, TorrentState } from 'meridian/models';

export const torrents: Partial<TorrentInfo>[] = Array(10).fill({
    name: 'Torrent 1',
    state: TorrentState.DOWNLOADING,
    added_on: 10000,
    category: 'Movies',
    tags: 'Plex',
    completed: 80,
    dlspeed: 50000,
    upspeed: 50000,
    downloaded: 20000,
    uploaded: 20000,
    hash: 'some hash',
    progress: 0.7,
    save_path: 'some save path',
    size: 80000,
    num_seeds: 10,
    num_leechs: 8,
    ratio: 0.22,
});
