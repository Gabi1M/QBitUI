/* eslint-disable-next-line no-restricted-imports */
import { GlobalState } from 'meridian/state/types';

export const selectTorrentTrackers = (state: GlobalState) => state.torrentTrackersState.fetch.data;
