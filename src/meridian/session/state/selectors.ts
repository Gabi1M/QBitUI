import { GlobalState } from 'meridian/state/types';

export const selectSessionIsLoggedIn = (state: GlobalState) => state.sessionState.loggedIn;

export const selectVersions = (state: GlobalState) => ({
    version: state.sessionState.version,
    apiVersion: state.sessionState.apiVersion,
});
