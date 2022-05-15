import { t } from '@lingui/macro';

export interface TorrentContent {
    index: string;
    name: string;
    size: number;
    progress: number;
    priority: FilePriority;
    is_seed: boolean;
    piece_range: number[];
    availability: number;
}

export enum FilePriority {
    DO_NOT_DOWNLOAD = 0,
    NORMAL = 1,
    HIGH = 6,
    MAXIMUM = 7,
}

export const FilePriorityDescription = {
    [FilePriority.DO_NOT_DOWNLOAD]: t`Ignored`,
    [FilePriority.NORMAL]: t`Normal`,
    [FilePriority.HIGH]: t`High`,
    [FilePriority.MAXIMUM]: t`Maximum`,
};
