import {
    MockCategories,
    MockMainData,
    MockPreferences,
    MockTags,
    MockTorrentContent,
    MockTorrentProperties,
    MockTorrentTrackers,
    MockTorrents,
    MockTransferInfo,
    isMockEnabled,
} from 'meridian/mock';
import {
    Category,
    ConnectionSettings,
    LoginResponse,
    MainData,
    Preferences,
    TorrentContent,
    TorrentInfo,
    TorrentProperties,
    TorrentTracker,
    TransferInfo,
} from 'meridian/models';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';
import {
    DeleteResourceParams,
    FetchResourceParams,
    Resource,
    SetResourceParams,
} from 'meridian/resource/types';
import { transformMainData } from 'meridian/transformers';

import { AddTorrentsFormDataScheme, AddTorrentsParams } from './types';

enum ApiPath {
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
                url: import.meta.env.VITE_API_URL || '',
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
            throw new Error(`GET request for ${finalUrl} failed with status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
            return (await response.json()) as T;
        }

        return (await response.text()) as unknown as T;
    }

    private static async postJSON<T>(url: string, data: Record<string, string>) {
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
            throw new Error(`POST request for ${url} failed with status: ${response.status}`);
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
            throw new Error(`POST request for ${url} failed with status: ${response.status}`);
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
        additionalData?: Record<string, string>,
    ) {
        return Api.postJSON<string>(`${this.baseUrl}/${action}`, {
            hashes: hashes.join('|'),
            ...additionalData,
        });
    }

    async login(username: string, password: string) {
        if (isMockEnabled) {
            return Promise.resolve(LoginResponse.SUCCESS);
        }

        return Api.postJSON<LoginResponse>(`${this.baseUrl}/${ApiPath.LOGIN}`, {
            username,
            password,
        });
    }

    async logout() {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }

        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.LOGOUT}`, {});
    }

    async version() {
        if (isMockEnabled) {
            return Promise.resolve('1.1.1.1');
        }

        return Api.getJSON<string>(`${this.baseUrl}/${ApiPath.VERSION}`);
    }

    async apiVersion() {
        if (isMockEnabled) {
            return Promise.resolve('1.1.1.1');
        }

        return Api.getJSON<string>(`${this.baseUrl}/${ApiPath.API_VERSION}`);
    }

    async fetchResource<T extends Resource = Resource>(
        resourceName: T,
        params?: FetchResourceParams[T],
    ) {
        switch (resourceName) {
            case Resource.MAIN_DATA: {
                return this.mainData((params as FetchResourceParams[Resource.MAIN_DATA])?.rid);
            }
            case Resource.TORRENT: {
                return this.torrents();
            }
            case Resource.TORRENT_PROPERTIES: {
                return this.torrentProperties(
                    (params as FetchResourceParams[Resource.TORRENT_PROPERTIES]).hash,
                );
            }
            case Resource.TORRENT_CONTENT: {
                return this.torrentContent(
                    (params as FetchResourceParams[Resource.TORRENT_CONTENT]).hash,
                );
            }
            case Resource.TORRENT_TRACKERS: {
                return this.torrentTrackers(
                    (params as FetchResourceParams[Resource.TORRENT_TRACKERS]).hash,
                );
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
        params: SetResourceParams[T],
    ) {
        switch (resourceName) {
            case Resource.PREFERENCES: {
                return this.setPreferences(params as Preferences);
            }
            case Resource.CATEGORIES: {
                return this.createCategory(params as { category: Category; editExisting: boolean });
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
        params: DeleteResourceParams[T],
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

    async mainData(rid?: number) {
        if (isMockEnabled) {
            return Promise.resolve(MockMainData);
        }

        let data: MainData | null = null;
        if (rid) {
            data = await Api.getJSON<MainData>(`${this.baseUrl}/${ApiPath.MAIN_DATA}?rid=${rid}`);
        } else {
            data = await Api.getJSON<MainData>(`${this.baseUrl}/${ApiPath.MAIN_DATA}`);
        }

        return transformMainData(data);
    }

    async torrents() {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrents as TorrentInfo[]);
        }
        return Api.getJSON<TorrentInfo[]>(`${this.baseUrl}/${ApiPath.TORRENTS}`);
    }

    async torrentProperties(hash: string) {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrentProperties);
        }
        return Api.getJSON<TorrentProperties>(
            `${this.baseUrl}/${ApiPath.TORRENT_PROPERTIES}`,
            new URLSearchParams({
                hash,
            }),
        );
    }

    async torrentContent(hash: string) {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrentContent);
        }
        return Api.getJSON<TorrentContent[]>(
            `${this.baseUrl}/${ApiPath.TORRENT_CONTENT}`,
            new URLSearchParams({
                hash,
            }),
        );
    }

    async torrentTrackers(hash: string) {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrentTrackers);
        }
        return Api.getJSON<TorrentTracker[]>(
            `${this.baseUrl}/${ApiPath.TORRENT_TRACKERS}`,
            new URLSearchParams({
                hash,
            }),
        );
    }

    async transferInfo() {
        if (isMockEnabled) {
            return Promise.resolve(MockTransferInfo);
        }
        return Api.getJSON<TransferInfo>(`${this.baseUrl}/${ApiPath.TRANSFER_INFO}`);
    }

    async preferences() {
        if (isMockEnabled) {
            return Promise.resolve(MockPreferences);
        }
        return Api.getJSON<Preferences>(`${this.baseUrl}/${ApiPath.PREFERENCES}`);
    }

    async setPreferences(preferences: Preferences) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.SET_PREFERENCES}`, {
            json: JSON.stringify(preferences),
        });
    }

    async categories() {
        if (isMockEnabled) {
            return Promise.resolve(MockCategories);
        }

        return Api.getJSON<Record<string, Category>>(`${this.baseUrl}/${ApiPath.CATEGORIES}`);
    }

    async createCategory({
        category,
        editExisting = false,
    }: {
        category: Category;
        editExisting: boolean;
    }) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return Api.postJSON<string>(
            `${this.baseUrl}/${editExisting ? ApiPath.EDIT_CATEGORY : ApiPath.CREATE_CATEGORY}`,
            {
                category: category.name,
                savePath: category.savePath,
            },
        );
    }

    async removeCategories(categories: Category[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.REMOVE_CATEGORIES}`, {
            categories: categories.map((x) => x.name).join('\n'),
        });
    }

    async tags() {
        if (isMockEnabled) {
            return Promise.resolve(MockTags);
        }
        return Api.getJSON<string[]>(`${this.baseUrl}/${ApiPath.TAGS}`);
    }

    async createTags(tagsToCreate: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.CREATE_TAGS}`, {
            tags: tagsToCreate.join(','),
        });
    }

    async deleteTags(tagsToDelete: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return Api.postJSON<string>(`${this.baseUrl}/${ApiPath.DELETE_TAGS}`, {
            tags: tagsToDelete.join(','),
        });
    }

    async pauseTorrents(hashes: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.torrentAction(ApiPath.PAUSE_TORRENTS, hashes);
    }

    async resumeTorrents(hashes: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.torrentAction(ApiPath.RESUME_TORRENTS, hashes);
    }

    async deleteTorrents(hashes: string[], deleteFiles: boolean) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.torrentAction(ApiPath.DELETE_TORRENTS, hashes, {
            deleteFiles: deleteFiles.toString(),
        });
    }

    async forceDownloadTorrents(hashes: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.torrentAction(ApiPath.FORCE_DOWNLOAD_TORRENTS, hashes);
    }

    async recheckTorrents(hashes: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.torrentAction(ApiPath.RECHECK_TORRENTS, hashes);
    }

    async setTorrentCategory(hashes: string[], categoryName: string) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.torrentAction(ApiPath.SET_TORRENT_CATEGORY, hashes, {
            category: categoryName,
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    async addTorrentsTags(hashes: string[], tags: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.torrentAction(ApiPath.ADD_TORRENT_TAGS, hashes, {
            tags: tags.join(','),
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    async removeTorrentsTags(hashes: string[], tags: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
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

        Object.entries(formDataScheme).forEach((entry) => {
            if (entry[1]) {
                formData.append(entry[0], entry[1]);
            }
        });

        params.torrents.forEach((torrent) => {
            formData.append('torrents', torrent);
        });

        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }

        return Api.postFormData<string>(`${this.baseUrl}/${ApiPath.ADD_TORRENTS}`, formData);
    }
}
