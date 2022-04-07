import { BaseAction } from 'meridian/resource';

export enum SessionActions {
    LOGIN = 'LOGIN',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
}

export type LoginAction = BaseAction;
export type LoginSuccessAction = BaseAction;
export type LoginFailAction = BaseAction;

export const loginAction = (): LoginAction => ({
    type: SessionActions.LOGIN,
});

export const loginSuccessAction = (): LoginSuccessAction => ({
    type: SessionActions.LOGIN_SUCCESS,
});

export const loginFailAction = (): LoginFailAction => ({
    type: SessionActions.LOGIN_FAIL,
});
