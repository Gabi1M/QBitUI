import { BaseAction } from 'meridian/resource';
import { SessionActions, SetVersionsAction } from './actions';
import { SessionState } from './types';

const initialState: SessionState = {
    loggedIn: false,
    version: '',
    apiVersion: '',
};

export const sessionReducer = (
    state: SessionState = initialState,
    action: BaseAction
): SessionState => {
    switch (action.type) {
        case SessionActions.LOGIN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
            };
        }
        case SessionActions.LOGIN_FAIL:
        case SessionActions.LOGOUT_SUCCESS:
        case SessionActions.LOGOUT_FAIL: {
            return {
                ...state,
                loggedIn: false,
            };
        }
        case SessionActions.SET_VERSIONS: {
            const setVersionsAction = action as SetVersionsAction;
            return {
                ...state,
                version: setVersionsAction.version,
                apiVersion: setVersionsAction.apiVersion,
            };
        }
        default: {
            return state;
        }
    }
};
