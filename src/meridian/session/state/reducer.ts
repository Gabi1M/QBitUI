import { BaseAction } from 'meridian/resource';
import { SessionActions } from './actions';
import { SessionState } from './types';

const initialState: SessionState = {
    loggedIn: false,
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
        case SessionActions.LOGIN_FAIL: {
            return {
                ...state,
                loggedIn: false,
            };
        }
        default: {
            return state;
        }
    }
};
