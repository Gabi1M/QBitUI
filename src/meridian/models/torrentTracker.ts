import { t } from '@lingui/macro';

export interface TorrentTracker {
    url: string;
    status: TorrentTrackerStatus;
    tier: number;
    num_peers: number;
    num_seeds: number;
    num_leeches: number;
    num_downloaded: number;
    msg: string;
}

export enum TorrentTrackerStatus {
    DISABLED = 0,
    NOT_CONTACTED = 1,
    CONTACTED = 2,
    UPDATING = 3,
    ERROR = 4,
}

export const TorrentTrackerStatusDescription = {
    [TorrentTrackerStatus.DISABLED]: t`Disabled`,
    [TorrentTrackerStatus.NOT_CONTACTED]: t`Not contacted`,
    [TorrentTrackerStatus.CONTACTED]: t`Contacted`,
    [TorrentTrackerStatus.UPDATING]: t`Updating`,
    [TorrentTrackerStatus.ERROR]: t`Error`,
};
