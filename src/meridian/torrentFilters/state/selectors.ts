/* eslint-disable-next-line no-restricted-imports */
import { GlobalState } from 'meridian/state/types';

export const selectTorrentFilters = (state: GlobalState) => state.torrentFiltersState.filters;
