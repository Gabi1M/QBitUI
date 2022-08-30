export interface AddTorrentsFormDataScheme {
    urls: string;
    savepath?: string;
    cookie?: string;
    category?: string;
    tags?: string;
    skip_checking?: 'true' | 'false';
    paused?: 'true' | 'false';
    root_folder?: 'true' | 'false';
    rename?: string;
    upLimit?: number;
    dlLimit?: number;
    ratioLimit?: number;
    seedingTimeLimit?: number;
    autoTMM?: boolean;
    sequentialDownload?: 'true' | 'false';
    firstLastPiecePrio?: 'true' | 'false';
}

export interface AddTorrentsParams {
    urls: string[];
    torrents: Blob[];
    savepath?: string;
    cookie?: string;
    category?: string;
    tags?: string[];
    skipChecking?: boolean;
    paused?: boolean;
    rootFolder?: boolean;
    rename?: string;
    upLimit?: number;
    dlLimit?: number;
    ratioLimit?: number;
    seedingTimeLimit?: number;
    autoTMM?: boolean;
    sequentialDownload?: boolean;
    firstLastPiecePrio?: boolean;
}
