import { GlobalState } from 'meridian/state/types';

export const selectTorrents = (state: GlobalState) =>
    state.torrentState.fetch.data;
export const selectTorrentError = (state: GlobalState) =>
    state.torrentState.fetch.error;
