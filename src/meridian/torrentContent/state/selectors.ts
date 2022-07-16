import { GlobalState } from 'meridian/state/types';

export const selectTorrentContent = (state: GlobalState) => state.torrentContentState.fetch.data;
