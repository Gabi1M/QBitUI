import { TorrentState } from 'meridian/models';

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

export const TorrentStateDescriptionMapping: Record<
    TorrentState,
    TorrentStateDescription
> = {
    [TorrentState.ALLOCATING]: TorrentStateDescription.ALLOCATING,
    [TorrentState.CHECKING_DL]: TorrentStateDescription.CHECKING,
    [TorrentState.CHECKING_RESUME_DATA]: TorrentStateDescription.RESUMING,
    [TorrentState.CHECKING_UP]: TorrentStateDescription.CHECKING,
    [TorrentState.DOWNLOADING]: TorrentStateDescription.DOWNLOADING,
    [TorrentState.ERROR]: TorrentStateDescription.ERROR,
    [TorrentState.FORCED_DL]: TorrentStateDescription.DOWNLOADING,
    [TorrentState.FORCED_UP]: TorrentStateDescription.UPLOADING,
    [TorrentState.META_DL]: TorrentStateDescription.DOWNLOADING,
    [TorrentState.MISSING_FILES]: TorrentStateDescription.MISSING_FILES,
    [TorrentState.MOVING]: TorrentStateDescription.MOVING,
    [TorrentState.PAUSED_DL]: TorrentStateDescription.PAUSED,
    [TorrentState.PAUSED_UP]: TorrentStateDescription.PAUSED,
    [TorrentState.QUEUED_DL]: TorrentStateDescription.QUEUED,
    [TorrentState.QUEUED_UP]: TorrentStateDescription.QUEUED,
    [TorrentState.STALLED_DL]: TorrentStateDescription.DOWNLOADING,
    [TorrentState.STALLED_UP]: TorrentStateDescription.UPLOADING,
    [TorrentState.UPLOADING]: TorrentStateDescription.UPLOADING,
    [TorrentState.UNKNOWN]: TorrentStateDescription.UNKNOWN,
};
