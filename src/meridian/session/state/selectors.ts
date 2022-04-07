import { GlobalState } from 'meridian/state/types';

export const selectSessionIsLoggedIn = (state: GlobalState) =>
    state.sessionState.loggedIn;
