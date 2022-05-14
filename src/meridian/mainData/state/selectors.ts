import { GlobalState } from 'meridian/state/types';

export const selectMainData = (state: GlobalState) =>
    state.mainDataState.fetch.data;
