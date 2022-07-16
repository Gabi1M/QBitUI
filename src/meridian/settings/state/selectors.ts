import { GlobalState } from 'meridian/state/types';

export const selectSettings = (state: GlobalState) => state.settingsState.settings;
