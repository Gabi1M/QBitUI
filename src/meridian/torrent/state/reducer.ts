import { BaseAction, createResourceReducer, Resource } from 'meridian/resource';

const { reducer: torrentReducer, actions } = createResourceReducer(
    Resource.TORRENT
);

const TorrentActions = {
    ...actions,
    PAUSE_TORRENTS: `${Resource.TORRENT.toUpperCase()}/PAUSE_TORRENTS`,
    RESUME_TORRENTS: `${Resource.TORRENT.toUpperCase()}/RESUME_TORRENTS`,
    DELETE_TORRENTS: `${Resource.TORRENT.toUpperCase()}/DELETE_TORRENTS`,
    FORCE_DOWNLOAD_TORRENTS: `${Resource.TORRENT.toUpperCase()}/FORCE_DOWNLOAD_TORRENTS`,
    RECHECK_TORRENTS: `${Resource.TORRENT.toUpperCase()}/RECHECK_TORRENTS`,
    SET_TORRENT_CATEGORY: `${Resource.TORRENT.toUpperCase()}/SET_CATEGORY`,
    ADD_TORRENTS_TAGS: `${Resource.TORRENT.toUpperCase()}/ADD_TORRENT_TAGS`,
    REMOVE_TORRENTS_TAGS: `${Resource.TORRENT.toUpperCase()}/REMOVE_TORRENTS_TAGS`,
};

interface TorrentAction extends BaseAction {
    hashes: string[];
}

export interface PauseTorrentsAction extends TorrentAction {}

export interface ResumeTorrentsAction extends TorrentAction {}

export interface DeleteTorrentsAction extends TorrentAction {
    deleteFiles: boolean;
}

export interface ForceDownloadTorrentsAction extends TorrentAction {}

export interface RecheckTorrentsAction extends TorrentAction {}

export interface SetTorrentCategoryAction extends TorrentAction {
    categoryName: string;
}

export interface AddTorrentsTagsAction extends TorrentAction {
    tags: string[];
}

export interface RemoveTorrentsTagsAction extends TorrentAction {
    tags: string[];
}

export const createPauseTorrentAction = (
    hashes: string[]
): PauseTorrentsAction => ({
    type: TorrentActions.PAUSE_TORRENTS,
    hashes,
});

export const createResumeTorrentAction = (
    hashes: string[]
): ResumeTorrentsAction => ({
    type: TorrentActions.RESUME_TORRENTS,
    hashes,
});

export const createDeleteTorrentAction = (
    hashes: string[],
    deleteFiles = false
): DeleteTorrentsAction => ({
    type: TorrentActions.DELETE_TORRENTS,
    hashes,
    deleteFiles,
});

export const createForceDownloadTorrentsAction = (
    hashes: string[]
): ForceDownloadTorrentsAction => ({
    type: TorrentActions.FORCE_DOWNLOAD_TORRENTS,
    hashes,
});

export const createRecheckTorrentsAction = (
    hashes: string[]
): RecheckTorrentsAction => ({
    type: TorrentActions.RECHECK_TORRENTS,
    hashes,
});

export const createSetTorrentCategoryAction = (
    hashes: string[],
    categoryName: string
): SetTorrentCategoryAction => ({
    type: TorrentActions.SET_TORRENT_CATEGORY,
    hashes,
    categoryName,
});

export const createAddTorrentsTagsAction = (
    hashes: string[],
    tags: string[]
): AddTorrentsTagsAction => ({
    type: TorrentActions.ADD_TORRENTS_TAGS,
    hashes,
    tags,
});

export const createRemoveTorrentsTagsAction = (
    hashes: string[],
    tags: string[]
): RemoveTorrentsTagsAction => ({
    type: TorrentActions.REMOVE_TORRENTS_TAGS,
    hashes,
    tags,
});

export { torrentReducer, TorrentActions };
