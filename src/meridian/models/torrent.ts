export enum TorrentState {
    ERROR = 'error',
    MISSING_FILES = 'missingFiles',
    UPLOADING = 'uploading',
    PAUSED_UP = 'pausedUP',
    QUEUED_UP = 'queuedUP',
    STALLED_UP = 'stalledUP',
    CHECKING_UP = 'checkingUP',
    FORCED_UP = 'forcedUP',
    ALLOCATING = 'allocating',
    DOWNLOADING = 'downloading',
    META_DL = 'metaDL',
    PAUSED_DL = 'pausedDL',
    QUEUED_DL = 'queuedDL',
    STALLED_DL = 'stalledDL',
    CHECKING_DL = 'checkingDL',
    FORCED_DL = 'forcedDL',
    CHECKING_RESUME_DATA = 'checkingResumeData',
    MOVING = 'moving',
    UNKNOWN = 'unknown',
}

export enum TorrentStateDescription {
    ALLOCATING = 'Allocating',
    CHECKING = 'Checking',
    DOWNLOADING = 'Downloading',
    UPLOADING = 'Uploading',
    ERROR = 'Error',
    MISSING_FILES = 'Missing files',
    MOVING = 'Moving',
    QUEUED = 'Queued',
    PAUSED = 'Paused',
    RESUMING = 'Resuming',
    UNKNOWN = 'Unknown',
}

export const TorrentStateDescriptionCollorMapping = {
    [TorrentStateDescription.DOWNLOADING]: 'green',
    [TorrentStateDescription.UPLOADING]: 'pink',
    [TorrentStateDescription.ERROR]: 'red',
    [TorrentStateDescription.MISSING_FILES]: 'red',
    [TorrentStateDescription.ALLOCATING]: 'blue',
    [TorrentStateDescription.CHECKING]: 'blue',
    [TorrentStateDescription.MOVING]: 'blue',
    [TorrentStateDescription.QUEUED]: 'blue',
    [TorrentStateDescription.PAUSED]: 'blue',
    [TorrentStateDescription.RESUMING]: 'blue',
    [TorrentStateDescription.UNKNOWN]: 'blue',
};

export interface TorrentInfo {
    added_on: number;
    amount_left: number;
    auto_tmm: boolean;
    availability: number;
    category: string;
    completed: number;
    completion_on: number;
    dl_limit: number;
    dlspeed: number;
    downloaded: number;
    downloaded_session: number;
    eta: number;
    f_l_piece_prio: boolean;
    force_start: boolean;
    hash: string;
    last_activity: number;
    magnet_uri: string;
    max_ratio: number;
    max_seeding_time: number;
    name: string;
    num_complete: number;
    num_incomplete: number;
    num_leechs: number;
    num_seeds: number;
    priority: number;
    progress: number;
    ratio: number;
    ratio_limit: number;
    save_path: string;
    seeding_time_limit: number;
    seen_complete: number;
    seq_dl: boolean;
    size: number;
    state: TorrentState;
    super_seeding: boolean;
    tags: string;
    time_active: number;
    total_size: number;
    tracker: string;
    up_limit: number;
    uploaded: number;
    uploaded_session: number;
    upspeed: number;
}

export interface TorrentAddOptions {
    savepath?: string;
    cookie?: string;
    category?: string;
    tags?: string;
    skip_checking?: boolean;
    paused?: boolean;
    root_folder?: boolean;
    contentLayout?: 'Original' | 'Subfolder' | 'NoSubfolder';
    rename?: string;
    upLimit?: number;
    dlLimit?: number;
    autoTMM?: boolean;
    sequentialDownload?: boolean;
    firstLastPiecePrio?: boolean;
}

export const TorrentStateGrouping: Record<
    TorrentStateDescription,
    TorrentState[]
> = {
    [TorrentStateDescription.ALLOCATING]: [TorrentState.ALLOCATING],
    [TorrentStateDescription.CHECKING]: [
        TorrentState.CHECKING_DL,
        TorrentState.CHECKING_UP,
    ],
    [TorrentStateDescription.DOWNLOADING]: [
        TorrentState.DOWNLOADING,
        TorrentState.META_DL,
        TorrentState.FORCED_DL,
        TorrentState.STALLED_DL,
    ],
    [TorrentStateDescription.UPLOADING]: [
        TorrentState.UPLOADING,
        TorrentState.FORCED_UP,
        TorrentState.STALLED_UP,
    ],
    [TorrentStateDescription.ERROR]: [TorrentState.ERROR],
    [TorrentStateDescription.MISSING_FILES]: [TorrentState.MISSING_FILES],
    [TorrentStateDescription.MOVING]: [TorrentState.MOVING],
    [TorrentStateDescription.QUEUED]: [
        TorrentState.QUEUED_DL,
        TorrentState.QUEUED_UP,
    ],
    [TorrentStateDescription.PAUSED]: [
        TorrentState.PAUSED_DL,
        TorrentState.PAUSED_UP,
    ],
    [TorrentStateDescription.RESUMING]: [TorrentState.CHECKING_RESUME_DATA],
    [TorrentStateDescription.UNKNOWN]: [TorrentState.UNKNOWN],
};

export const getTorrentStateDescription = (
    torrentState: TorrentState
): TorrentStateDescription =>
    Object.entries(TorrentStateGrouping).filter(x =>
        x[1].includes(torrentState)
    )[0][0] as TorrentStateDescription;
