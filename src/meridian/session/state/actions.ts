import { BaseAction } from 'meridian/resource';

export enum SessionActions {
    LOGIN = 'SESSION/LOGIN',
    LOGIN_SUCCESS = 'SESSION/LOGIN_SUCCESS',
    LOGIN_FAIL = 'SESSION/LOGIN_FAIL',
    LOGOUT = 'SESSION/LOGOUT',
    LOGOUT_SUCCESS = 'SESSION/LOGOUT_SUCCESS',
    LOGOUT_FAIL = 'SESSION/LOGOUT_FAIL',
    FETCH_VERSIONS = 'SESSION/FETCH_VERSIONS',
    SET_VERSIONS = 'SESSION/SET_VERSIONS',
}

export type LoginAction = BaseAction & {
    username: string;
    password: string;
};

export type SetVersionsAction = BaseAction & {
    version: string;
    apiVersion: string;
};

export const loginAction = (username: string, password: string): LoginAction => ({
    type: SessionActions.LOGIN,
    username,
    password,
});

export const loginSuccessAction = (): BaseAction => ({
    type: SessionActions.LOGIN_SUCCESS,
});

export const loginFailAction = (): BaseAction => ({
    type: SessionActions.LOGIN_FAIL,
});

export const logoutAction = (): BaseAction => ({
    type: SessionActions.LOGOUT,
});

export const logoutSuccessAction = (): BaseAction => ({
    type: SessionActions.LOGOUT_SUCCESS,
});

export const logoutFailAction = (): BaseAction => ({
    type: SessionActions.LOGOUT_FAIL,
});

export const createFetchVersionsAction = (): BaseAction => ({
    type: SessionActions.FETCH_VERSIONS,
});

export const createSetVersionsAction = (
    version: string,
    apiVersion: string,
): SetVersionsAction => ({
    type: SessionActions.SET_VERSIONS,
    version,
    apiVersion,
});
