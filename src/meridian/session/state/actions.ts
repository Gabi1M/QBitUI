import { BaseAction } from 'meridian/resource';

export enum SessionActions {
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    LOGOUT = 'LOGOUT',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_FAIL = 'LOGOUT_FAIL',
}

export type LoginAction = BaseAction & {
    username: string;
    password: string;
};

export const loginAction = (
    username: string,
    password: string
): LoginAction => ({
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
