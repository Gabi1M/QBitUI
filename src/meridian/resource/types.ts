import { AddTorrentsParams } from 'meridian/api/types';
import {
    Category,
    Preferences,
    TorrentInfo,
    TransferInfo,
} from 'meridian/models';

export enum Resource {
    TORRENT = 'torrent',

    TRANSFER_INFO = 'transfer_info',
    PREFERENCES = 'preferences',
    CATEGORIES = 'categories',
    TAGS = 'tags',
}

export type ResourceDataType = {
    [Resource.TORRENT]: TorrentInfo[];
    [Resource.TRANSFER_INFO]: TransferInfo;
    [Resource.PREFERENCES]: Preferences;
    [Resource.CATEGORIES]: Record<string, Category>;
    [Resource.TAGS]: string[];
};

export type FetchResourceParams = {
    [Resource.TORRENT]: undefined;
    [Resource.TRANSFER_INFO]: undefined;
    [Resource.PREFERENCES]: undefined;
    [Resource.CATEGORIES]: undefined;
    [Resource.TAGS]: undefined;
};

export type SetResourceParams = {
    [Resource.TORRENT]: AddTorrentsParams;
    [Resource.TRANSFER_INFO]: undefined;
    [Resource.PREFERENCES]: Preferences;
    [Resource.CATEGORIES]: {
        category: Category;
        editExisting?: boolean;
    };
    [Resource.TAGS]: string[];
};

export type DeleteResourceParams = {
    [Resource.TORRENT]: undefined;
    [Resource.TRANSFER_INFO]: undefined;
    [Resource.PREFERENCES]: undefined;
    [Resource.CATEGORIES]: Category[];
    [Resource.TAGS]: string[];
};
