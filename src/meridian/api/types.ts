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

export class ApiError extends Error {
    public status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

export enum Headers {
    AUTHORIZATION = 'Authorization',
    CONTENT_TYPE = 'Content-Type',
}

export enum ContentType {
    APPLICATION_JSON = 'application/json',
    TEXT_PLAIN = 'text/plain',
    MULTIPART_FORM_DATA = 'multipart/form-data',
    URL_FORM_ENCODED = 'application/x-www-form-urlencoded',
}

export enum ApiPath {
    LOGIN = 'auth/login',
    LOGOUT = 'auth/logout',
    VERSION = 'app/version',
    API_VERSION = 'app/webapiVersion',
    MAIN_DATA = 'sync/maindata',
    ADD_TORRENTS = 'torrents/add',
    TORRENTS = 'torrents/info',
    TORRENT_PROPERTIES = 'torrents/properties',
    TORRENT_CONTENT = 'torrents/files',
    TORRENT_TRACKERS = 'torrents/trackers',
    TRANSFER_INFO = 'transfer/info',
    PREFERENCES = 'app/preferences',
    SET_PREFERENCES = 'app/setPreferences',
    CATEGORIES = 'torrents/categories',
    CREATE_CATEGORY = 'torrents/createCategory',
    EDIT_CATEGORY = 'torrents/editCategory',
    REMOVE_CATEGORIES = 'torrents/removeCategories',
    TAGS = 'torrents/tags',
    CREATE_TAGS = 'torrents/createTags',
    DELETE_TAGS = 'torrents/deleteTags',
    PAUSE_TORRENTS = 'torrents/pause',
    RESUME_TORRENTS = 'torrents/resume',
    DELETE_TORRENTS = 'torrents/delete',
    FORCE_DOWNLOAD_TORRENTS = 'torrents/setForceStart',
    RECHECK_TORRENTS = 'torrents/recheck',
    SET_TORRENT_CATEGORY = 'torrents/setCategory',
    ADD_TORRENT_TAGS = 'torrents/addTags',
    REMOVE_TORRENT_TAGS = 'torrents/removeTags',
}
