import {
    Category,
    ConnectionSettings,
    LoginResponse,
    Preferences,
    TorrentInfo,
    TransferInfo,
} from 'meridian/models';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';
import {
    Resource,
    SetResourceParams,
    FetchResourceParams,
    DeleteResourceParams,
} from 'meridian/resource/types';
import { AddTorrentsFormDataScheme, AddTorrentsParams } from './types';

enum ApiPath {
    LOGIN = 'auth/login',
    LOGOUT = 'auth/logout',
    VERSION = 'app/version',
    API_VERSION = 'app/webapiVersion',
    ADD_TORRENTS = 'torrents/add',
    TORRENTS = 'torrents/info',
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

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
}

export class Api {
    private static instance: Api | null;

    private connectionSettings: ConnectionSettings;

    private baseUrl: string;

    constructor(connectionSettings: ConnectionSettings) {
        this.connectionSettings = connectionSettings;
        this.baseUrl = `${connectionSettings.url}/api/v2`;
    }

    static getInstance() {
        if (!Api.instance) {
            Api.instance = new Api({
                url: process.env.REACT_APP_API_URL || '',
            });
        }

        return Api.instance;
    }

    private static async getJSON<T>(url: string, params?: URLSearchParams) {
        const finalUrl = params ? `${url}?${params.toString()}` : url;

        const response = await fetch(finalUrl, {
            method: RequestMethod.GET,
            credentials: 'same-origin',
        });

        if (response.status !== 200) {
            if (response.status === 403) {
                history.replace(AppRoutes.LOGIN);
            }
            throw new Error(
                `GET request for ${finalUrl} failed with status: ${response.status}`
            );
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return (await response.json()) as T;
        }

        return (await response.text()) as unknown as T;
    }

    private static async postJSON<T>(
        url: string,
        data: Record<string, string>
    ) {
        const response = await fetch(url, {
            method: RequestMethod.POST,
            credentials: 'same-origin',
            // referrerPolicy: 'strict-origin-when-cross-origin',
            body: new URLSearchParams(Object.entries(data)),
        });

        if (response.status !== 200) {
            if (response.status === 403) {
                history.replace(AppRoutes.LOGIN);
            }
            throw new Error(
                `POST request for ${url} failed with status: ${response.status}`
            );
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return (await response.json()) as T;
        }

        return (await response.text()) as unknown as T;
    }

    private static async postFormData<T>(url: string, data: FormData) {
        const response = await fetch(url, {
            method: RequestMethod.POST,
            credentials: 'include',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: data,
        });

        if (response.status !== 200) {
            throw new Error(
                `POST request for ${url} failed with status: ${response.status}`
            );
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return (await response.json()) as T;
        }

        return (await response.text()) as unknown as T;
    }

    private async torrentAction(
        action: ApiPath,
        hashes: string[],
        additionalData?: Record<string, string>
    ) {
        return Api.postJSON<string>(`${this.baseUrl}/${action}`, {
            hashes: hashes.join('|'),
            ...additionalData,
        });
    }

    async login(username: string, password: string) {
        return Api.postJSON<LoginResponse>(`${this.baseUrl}/${ApiPath.LOGIN}`, {
            username,
            password,
        });
    }

    async logout() {
        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.LOGOUT}`, {});
    }

    async version() {
        return Api.getJSON<string>(`${this.baseUrl}/${ApiPath.VERSION}`);
    }

    async apiVersion() {
        return Api.getJSON<string>(`${this.baseUrl}/${ApiPath.API_VERSION}`);
    }

    async fetchResource<T extends Resource = Resource>(
        resourceName: T,
        params?: FetchResourceParams[T] // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
        switch (resourceName) {
            case Resource.TORRENT: {
                return this.torrents();
            }
            case Resource.TRANSFER_INFO: {
                return this.transferInfo();
            }
            case Resource.PREFERENCES: {
                return this.preferences();
            }
            case Resource.CATEGORIES: {
                return this.categories();
            }
            case Resource.TAGS: {
                return this.tags();
            }
            default: {
                return null;
            }
        }
    }

    async setResource<T extends Resource = Resource>(
        resourceName: T,
        params: SetResourceParams[T]
    ) {
        switch (resourceName) {
            case Resource.PREFERENCES: {
                return this.setPreferences(params as Preferences);
            }
            case Resource.CATEGORIES: {
                return this.createCategory(
                    params as { category: Category; editExisting: boolean }
                );
            }
            case Resource.TAGS: {
                return this.createTags(params as string[]);
            }
            case Resource.TORRENT: {
                return this.addTorrents(params as AddTorrentsParams);
            }
            default: {
                return null;
            }
        }
    }

    async deleteResource<T extends Resource = Resource>(
        resourceName: T,
        params: DeleteResourceParams[T]
    ) {
        switch (resourceName) {
            case Resource.CATEGORIES: {
                return this.removeCategories(params as Category[]);
            }
            case Resource.TAGS: {
                return this.deleteTags(params as string[]);
            }
            default: {
                return null;
            }
        }
    }

    async torrents() {
        return Api.getJSON<TorrentInfo[]>(
            `${this.baseUrl}/${ApiPath.TORRENTS}`
        );
    }

    async transferInfo() {
        return Api.getJSON<TransferInfo>(
            `${this.baseUrl}/${ApiPath.TRANSFER_INFO}`
        );
    }

    async preferences() {
        return Api.getJSON<Preferences>(
            `${this.baseUrl}/${ApiPath.PREFERENCES}`
        );
    }

    async setPreferences(preferences: Preferences) {
        return Api.postJSON<string>(
            `${this.baseUrl}/${ApiPath.SET_PREFERENCES}`,
            {
                json: JSON.stringify(preferences),
            }
        );
    }

    async categories() {
        return Api.getJSON<Record<string, Category>>(
            `${this.baseUrl}/${ApiPath.CATEGORIES}`
        );
    }

    async createCategory({
        category,
        editExisting = false,
    }: {
        category: Category;
        editExisting: boolean;
    }) {
        return Api.postJSON<string>(
            `${this.baseUrl}/${
                editExisting ? ApiPath.EDIT_CATEGORY : ApiPath.CREATE_CATEGORY
            }`,
            {
                category: category.name,
                savePath: category.savePath,
            }
        );
    }

    async removeCategories(categories: Category[]) {
        return Api.postJSON<string>(
            `${this.baseUrl}/${ApiPath.REMOVE_CATEGORIES}`,
            {
                categories: categories.map(x => x.name).join('\n'),
            }
        );
    }

    async tags() {
        return Api.getJSON<string[]>(`${this.baseUrl}/${ApiPath.TAGS}`);
    }

    async createTags(tagsToCreate: string[]) {
        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.CREATE_TAGS}`, {
            tags: tagsToCreate.join(','),
        });
    }

    async deleteTags(tagsToDelete: string[]) {
        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.DELETE_TAGS}`, {
            tags: tagsToDelete.join(','),
        });
    }

    async pauseTorrents(hashes: string[]) {
        return this.torrentAction(ApiPath.PAUSE_TORRENTS, hashes);
    }

    async resumeTorrents(hashes: string[]) {
        return this.torrentAction(ApiPath.RESUME_TORRENTS, hashes);
    }

    async deleteTorrents(hashes: string[], deleteFiles: boolean) {
        return this.torrentAction(ApiPath.DELETE_TORRENTS, hashes, {
            deleteFiles: deleteFiles.toString(),
        });
    }

    async forceDownloadTorrents(hashes: string[]) {
        return this.torrentAction(ApiPath.FORCE_DOWNLOAD_TORRENTS, hashes);
    }

    async recheckTorrents(hashes: string[]) {
        return this.torrentAction(ApiPath.RECHECK_TORRENTS, hashes);
    }

    async setTorrentCategory(hashes: string[], categoryName: string) {
        return this.torrentAction(ApiPath.SET_TORRENT_CATEGORY, hashes, {
            category: categoryName,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    async addTorrentsTags(hashes: string[], tags: string[]) {
        return this.torrentAction(ApiPath.ADD_TORRENT_TAGS, hashes, {
            tags: tags.join(','),
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    async removeTorrentsTags(hashes: string[], tags: string[]) {
        return this.torrentAction(ApiPath.REMOVE_TORRENT_TAGS, hashes, {
            tags: tags.join(','),
        });
    }

    async addTorrents(params: AddTorrentsParams) {
        const formDataScheme: AddTorrentsFormDataScheme = {
            urls: params.urls.join('\n'),
            savepath: params.savepath,
            cookie: params.cookie,
            category: params.category?.name,
            tags: params.tags?.join(','),
            skip_checking: params.skipChecking ? 'true' : 'false',
            paused: params.paused ? 'true' : 'false',
            root_folder: params.rootFolder ? 'true' : 'false',
            rename: params.rename,
            upLimit: params.upLimit,
            dlLimit: params.dlLimit,
            ratioLimit: params.ratioLimit,
            seedingTimeLimit: params.seedingTimeLimit,
            autoTMM: params.autoTMM,
            sequentialDownload: params.sequentialDownload ? 'true' : 'false',
            firstLastPiecePrio: params.firstLastPiecePrio ? 'true' : 'false',
        };

        const formData = new FormData();

        Object.entries(formDataScheme).forEach(entry => {
            if (entry[1]) {
                formData.append(entry[0], entry[1]);
            }
        });

        params.torrents.forEach(torrent => {
            formData.append('torrents', torrent);
        });

        return Api.postFormData<string>(
            `${this.baseUrl}/${ApiPath.ADD_TORRENTS}`,
            formData
        );
    }
}
