import { TorrentFilters } from 'meridian/models';
import { BaseAction } from 'meridian/resource';

export enum TorrentFiltersActions {
    SET_TORRENT_FILTERS = 'SET_TORRENT_FILTERS',
}

export interface SetTorrentFiltersAction extends BaseAction {
    filters: TorrentFilters;
}
export const createSetTorrentFiltersAction = (
    filters: TorrentFilters
): SetTorrentFiltersAction => ({
    type: TorrentFiltersActions.SET_TORRENT_FILTERS,
    filters,
});
