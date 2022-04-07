import { GlobalState } from 'meridian/state/types';

export const selectTags = (state: GlobalState) => state.tagsState.fetch.data;
