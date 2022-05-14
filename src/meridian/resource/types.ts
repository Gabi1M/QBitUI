import { AddTorrentsParams } from 'meridian/api/types';
import {
    Category,
    MainData,
    Preferences,
    TorrentInfo,
    TorrentProperties,
    TransferInfo,
} from 'meridian/models';

export enum Resource {
    MAIN_DATA = 'main_data',
    TORRENT = 'torrent',
    TORRENT_PROPERTIES = 'torrent_properties',
    TRANSFER_INFO = 'transfer_info',
    PREFERENCES = 'preferences',
    CATEGORIES = 'categories',
    TAGS = 'tags',
}

export type ResourceDataType = {
    [Resource.MAIN_DATA]: MainData;
    [Resource.TORRENT]: TorrentInfo[];
    [Resource.TORRENT_PROPERTIES]: TorrentProperties;
    [Resource.TRANSFER_INFO]: TransferInfo;
    [Resource.PREFERENCES]: Preferences;
    [Resource.CATEGORIES]: Record<string, Category>;
    [Resource.TAGS]: string[];
};

export type FetchResourceParams = {
    [Resource.MAIN_DATA]: {
        rid?: number;
    };
    [Resource.TORRENT]: undefined;
    [Resource.TORRENT_PROPERTIES]: {
        hash: string;
    };
    [Resource.TRANSFER_INFO]: undefined;
    [Resource.PREFERENCES]: undefined;
    [Resource.CATEGORIES]: undefined;
    [Resource.TAGS]: undefined;
};

export type SetResourceParams = {
    [Resource.MAIN_DATA]: undefined;
    [Resource.TORRENT]: AddTorrentsParams;
    [Resource.TORRENT_PROPERTIES]: undefined;
    [Resource.TRANSFER_INFO]: undefined;
    [Resource.PREFERENCES]: Preferences;
    [Resource.CATEGORIES]: {
        category: Category;
        editExisting?: boolean;
    };
    [Resource.TAGS]: string[];
};

export type DeleteResourceParams = {
    [Resource.MAIN_DATA]: undefined;
    [Resource.TORRENT]: undefined;
    [Resource.TORRENT_PROPERTIES]: undefined;
    [Resource.TRANSFER_INFO]: undefined;
    [Resource.PREFERENCES]: undefined;
    [Resource.CATEGORIES]: Category[];
    [Resource.TAGS]: string[];
};
