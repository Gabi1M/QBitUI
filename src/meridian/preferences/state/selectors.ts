/* eslint-disable-next-line no-restricted-imports */
import { GlobalState } from 'meridian/state/types';

export const selectPreferences = (state: GlobalState) => state.preferencesState.fetch.data;
