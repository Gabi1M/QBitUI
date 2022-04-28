import { DefaultMantineColor } from '@mantine/core';
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

export interface StateColorMapping {
    stateText: TorrentStateDescription;
    color: DefaultMantineColor;
}

export const StateGrouping: Record<TorrentStateDescription, TorrentState[]> = {
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

export const StateToStringMapping: Record<TorrentState, StateColorMapping> = {
    [TorrentState.ALLOCATING]: {
        stateText: TorrentStateDescription.ALLOCATING,
        color: 'blue',
    },
    [TorrentState.CHECKING_DL]: {
        stateText: TorrentStateDescription.CHECKING,
        color: 'orange',
    },
    [TorrentState.CHECKING_RESUME_DATA]: {
        stateText: TorrentStateDescription.RESUMING,
        color: 'orange',
    },
    [TorrentState.CHECKING_UP]: {
        stateText: TorrentStateDescription.CHECKING,
        color: 'orange',
    },
    [TorrentState.DOWNLOADING]: {
        stateText: TorrentStateDescription.DOWNLOADING,
        color: 'lime',
    },
    [TorrentState.ERROR]: {
        stateText: TorrentStateDescription.ERROR,
        color: 'red',
    },
    [TorrentState.FORCED_DL]: {
        stateText: TorrentStateDescription.DOWNLOADING,
        color: 'lime',
    },
    [TorrentState.FORCED_UP]: {
        stateText: TorrentStateDescription.UPLOADING,
        color: 'indigo',
    },
    [TorrentState.META_DL]: {
        stateText: TorrentStateDescription.DOWNLOADING,
        color: 'lime',
    },
    [TorrentState.MISSING_FILES]: {
        stateText: TorrentStateDescription.MISSING_FILES,
        color: 'red',
    },
    [TorrentState.MOVING]: {
        stateText: TorrentStateDescription.MOVING,
        color: 'blue',
    },
    [TorrentState.PAUSED_DL]: {
        stateText: TorrentStateDescription.PAUSED,
        color: 'blue',
    },
    [TorrentState.PAUSED_UP]: {
        stateText: TorrentStateDescription.PAUSED,
        color: 'blue',
    },
    [TorrentState.QUEUED_DL]: {
        stateText: TorrentStateDescription.QUEUED,
        color: 'lime',
    },
    [TorrentState.QUEUED_UP]: {
        stateText: TorrentStateDescription.QUEUED,
        color: 'indigo',
    },
    [TorrentState.STALLED_DL]: {
        stateText: TorrentStateDescription.DOWNLOADING,
        color: 'lime',
    },
    [TorrentState.STALLED_UP]: {
        stateText: TorrentStateDescription.UPLOADING,
        color: 'indigo',
    },
    [TorrentState.UPLOADING]: {
        stateText: TorrentStateDescription.UPLOADING,
        color: 'indigo',
    },
    [TorrentState.UNKNOWN]: {
        stateText: TorrentStateDescription.UNKNOWN,
        color: 'red',
    },
};
