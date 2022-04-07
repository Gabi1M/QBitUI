import { GlobalState } from 'meridian/state/types';

export const selectTorrentFilters = (state: GlobalState) =>
    state.torrentFiltersState.filters;
