import { GlobalState } from 'meridian/state/types';

export const selectTorrentProperties = (state: GlobalState) =>
    state.torrentPropertiesState.fetch.data;
