/* eslint-disable no-restricted-imports */
import { getApiUrl } from 'meridian/importMetaUtils';
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
    LoginResponse,
    MainData,
    Preferences,
    TorrentContent,
    TorrentInfo,
    TorrentProperties,
    TorrentTracker,
    TransferInfo,
} from 'meridian/models';
import {
    DeleteResourceParams,
    FetchResourceParams,
    Resource,
    SetResourceParams,
} from 'meridian/resource/types';
import { transformMainData } from 'meridian/transformers';

import {
    AddTorrentsFormDataScheme,
    AddTorrentsParams,
    ApiError,
    ApiPath,
    ContentType,
    Headers,
    RequestMethod,
} from './types';

const isSuccessStatusCode = (code: number) => code >= 200 && code < 400;

const handleResponse = async <T>(response: Response): Promise<T> => {
    const contentType = response.headers.get(Headers.CONTENT_TYPE);
    if (contentType && contentType.indexOf(ContentType.APPLICATION_JSON) !== -1) {
        return (await response.json()) as T;
    }

    return (await response.text()) as unknown as T;
};

export class Api {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${getApiUrl()}/api/v2`;
    }

    //#region Generic

    async get<T>(url: string, params?: URLSearchParams): Promise<T> {
        let finalUrl = `${this.baseUrl}/${url}`;
        if (params) {
            finalUrl = `${finalUrl}?${params.toString()}`;
        }

        const response = await fetch(finalUrl.toString(), {
            method: RequestMethod.GET,
            credentials: 'include',
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new ApiError(
                response.status,
                `GET request for ${finalUrl.toString()} failed with status: ${response.status}`,
            );
        }

        return handleResponse<T>(response);
    }

    async post<T>(url: string, data: string | URLSearchParams | FormData): Promise<T> {
        const finalUrl = `${this.baseUrl}/${url}`;
        const response = await fetch(finalUrl.toString(), {
            method: RequestMethod.POST,
            credentials: 'include',
            body: data,
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new ApiError(
                response.status,
                `POST request for ${finalUrl.toString()} failed with status: ${response.status}`,
            );
        }

        return handleResponse<T>(response);
    }

    async delete<T>(url: string, params?: URLSearchParams): Promise<T> {
        let finalUrl = `${this.baseUrl}/${url}`;
        if (params) {
            finalUrl = `${finalUrl}?${params.toString()}`;
        }

        const response = await fetch(finalUrl.toString(), {
            method: RequestMethod.DELETE,
            credentials: 'include',
        });

        if (!isSuccessStatusCode(response.status)) {
            throw new ApiError(
                response.status,
                `DELETE request for ${finalUrl.toString()} failed with status: ${response.status}`,
            );
        }

        return handleResponse<T>(response);
    }

    //#endregion

    //#region GET

    async fetchMainData(rid?: number) {
        if (isMockEnabled) {
            return Promise.resolve(MockMainData);
        }

        let data: MainData | null = null;
        if (rid) {
            data = await this.get<MainData>(`${ApiPath.MAIN_DATA}?rid=${rid}`);
        } else {
            data = await this.get<MainData>(ApiPath.MAIN_DATA);
        }

        return transformMainData(data);
    }

    async fetchTorrents() {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrents as TorrentInfo[]);
        }
        return this.get<TorrentInfo[]>(ApiPath.TORRENTS);
    }

    async fetchTorrentProperties(hash: string) {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrentProperties);
        }
        return this.get<TorrentProperties>(
            ApiPath.TORRENT_PROPERTIES,
            new URLSearchParams({
                hash,
            }),
        );
    }

    async fetchTorrentContent(hash: string) {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrentContent);
        }
        return this.get<TorrentContent[]>(
            ApiPath.TORRENT_CONTENT,
            new URLSearchParams({
                hash,
            }),
        );
    }

    async fetchTorrentTrackers(hash: string) {
        if (isMockEnabled) {
            return Promise.resolve(MockTorrentTrackers);
        }
        return this.get<TorrentTracker[]>(
            ApiPath.TORRENT_TRACKERS,
            new URLSearchParams({
                hash,
            }),
        );
    }

    async fetchTransferInfo() {
        if (isMockEnabled) {
            return Promise.resolve(MockTransferInfo);
        }
        return this.get<TransferInfo>(ApiPath.TRANSFER_INFO);
    }

    async fetchPreferences() {
        if (isMockEnabled) {
            return Promise.resolve(MockPreferences);
        }
        return this.get<Preferences>(ApiPath.PREFERENCES);
    }

    async fetchCategories() {
        if (isMockEnabled) {
            return Promise.resolve(MockCategories);
        }

        return this.get<Record<string, Category>>(ApiPath.CATEGORIES);
    }

    async fetchTags() {
        if (isMockEnabled) {
            return Promise.resolve(MockTags);
        }
        return this.get<string[]>(ApiPath.TAGS);
    }

    async fetchResource<T extends Resource = Resource>(
        resourceName: T,
        params?: FetchResourceParams[T],
    ) {
        switch (resourceName) {
            case Resource.MAIN_DATA: {
                return this.fetchMainData((params as FetchResourceParams[Resource.MAIN_DATA])?.rid);
            }
            case Resource.TORRENT: {
                return this.fetchTorrents();
            }
            case Resource.TORRENT_PROPERTIES: {
                return this.fetchTorrentProperties(
                    (params as FetchResourceParams[Resource.TORRENT_PROPERTIES]).hash,
                );
            }
            case Resource.TORRENT_CONTENT: {
                return this.fetchTorrentContent(
                    (params as FetchResourceParams[Resource.TORRENT_CONTENT]).hash,
                );
            }
            case Resource.TORRENT_TRACKERS: {
                return this.fetchTorrentTrackers(
                    (params as FetchResourceParams[Resource.TORRENT_TRACKERS]).hash,
                );
            }
            case Resource.TRANSFER_INFO: {
                return this.fetchTransferInfo();
            }
            case Resource.PREFERENCES: {
                return this.fetchPreferences();
            }
            case Resource.CATEGORIES: {
                return this.fetchCategories();
            }
            case Resource.TAGS: {
                return this.fetchTags();
            }
            default: {
                return null;
            }
        }
    }

    //#endregion

    //#region SET

    async setPreferences(preferences: Preferences) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }

        return this.post<string>(
            ApiPath.SET_PREFERENCES,
            new URLSearchParams({
                json: JSON.stringify(preferences),
            }),
        );
    }

    async setCategory({
        category,
        editExisting = false,
    }: {
        category: Category;
        editExisting: boolean;
    }) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }

        const formData = new FormData();
        formData.append('category', category.name);
        formData.append('savePath', category.savePath);
        return this.post<string>(
            editExisting ? ApiPath.EDIT_CATEGORY : ApiPath.CREATE_CATEGORY,
            formData,
        );
    }

    async createTags(tagsToCreate: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.post<string>(
            ApiPath.CREATE_TAGS,
            JSON.stringify({
                tags: tagsToCreate.join(','),
            }),
        );
    }

    async addTorrents(params: AddTorrentsParams) {
        const formDataScheme: AddTorrentsFormDataScheme = {
            urls: params.urls.join('\n'),
            savepath: params.savepath,
            cookie: params.cookie,
            category: params.category,
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

        return this.post<string>(ApiPath.ADD_TORRENTS, formData);
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
                return this.setCategory(params as { category: Category; editExisting: boolean });
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

    //#endregion

    //#region DELETE

    async deleteCategories(categories: Category[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        const formData = new FormData();
        formData.append('categories', categories.map((x) => x.name).join('\n'));
        return this.post<string>(ApiPath.REMOVE_CATEGORIES, formData);
    }

    async deleteTags(tagsToDelete: string[]) {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }
        return this.post<string>(
            ApiPath.DELETE_TAGS,
            JSON.stringify({
                tags: tagsToDelete.join(','),
            }),
        );
    }

    async deleteResource<T extends Resource = Resource>(
        resourceName: T,
        params: DeleteResourceParams[T],
    ) {
        switch (resourceName) {
            case Resource.CATEGORIES: {
                return this.deleteCategories(params as Category[]);
            }
            case Resource.TAGS: {
                return this.deleteTags(params as string[]);
            }
            default: {
                return null;
            }
        }
    }

    //#endregion

    //#region TORRENT

    private async torrentAction(
        action: ApiPath,
        hashes: string[],
        additionalData?: Record<string, string>,
    ) {
        return this.post<string>(
            action,
            new URLSearchParams({
                hashes: hashes.join('|'),
                ...additionalData,
            }),
        );
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

    //#endregion

    async login(username: string, password: string) {
        if (isMockEnabled) {
            return Promise.resolve(LoginResponse.SUCCESS);
        }

        return this.post<LoginResponse>(
            ApiPath.LOGIN,
            new URLSearchParams({
                username,
                password,
            }),
        );
    }

    async logout() {
        if (isMockEnabled) {
            return Promise.resolve('Ok.');
        }

        return this.post<string>(ApiPath.LOGOUT, new URLSearchParams());
    }

    async fetchVersion() {
        if (isMockEnabled) {
            return Promise.resolve('1.1.1.1');
        }

        return this.get<string>(ApiPath.VERSION);
    }

    async fetchApiVersion() {
        if (isMockEnabled) {
            return Promise.resolve('1.1.1.1');
        }

        return this.get<string>(ApiPath.API_VERSION);
    }
}
