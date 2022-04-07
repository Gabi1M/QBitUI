import { LocalStorage, LocalStorageKey } from 'meridian/localStorage';
import { BaseAction } from 'meridian/resource';
import { SetTorrentFiltersAction, TorrentFiltersActions } from './actions';
import { TorrentFiltersState } from './types';

const initialState: TorrentFiltersState = {
    filters: {
        name: '',
        states: [],
        categories: [],
        tags: [],
    },
};

export const torrentFiltersReducer = (
    state: TorrentFiltersState = initialState,
    action: BaseAction
): TorrentFiltersState => {
    switch (action.type) {
        case TorrentFiltersActions.SET_TORRENT_FILTERS: {
            const setAction = action as SetTorrentFiltersAction;
            LocalStorage.setValue(
                LocalStorageKey.TORRENT_FILTERS,
                setAction.filters
            );
            return {
                ...state,
                filters: setAction.filters,
            };
        }
        default: {
            return state;
        }
    }
};
