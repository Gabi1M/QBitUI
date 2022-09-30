/* eslint-disable no-restricted-imports */
import { t } from '@lingui/macro';
import { apply, put, takeLatest } from 'redux-saga/effects';

import { Api, ApiError } from 'meridian/api';
import { LoginResponse } from 'meridian/models';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';
import { Resource, createResourceFetchAction } from 'meridian/resource';
import { showSnackbarAction } from 'meridian/snackbar';

import {
    LoginAction,
    SessionActions,
    createFetchVersionsAction,
    createSetVersionsAction,
    loginFailAction,
    loginSuccessAction,
    logoutFailAction,
    logoutSuccessAction,
} from './actions';

function* loginSaga(action: LoginAction) {
    const api = new Api();
    try {
        const response: LoginResponse = yield apply(api, api.login, [
            action.username,
            action.password,
        ]);
        if (response === LoginResponse.SUCCESS) {
            yield put(loginSuccessAction());
            yield put(showSnackbarAction(t`Login successful!`, 'success', 2000));

            yield put(createResourceFetchAction(Resource.CATEGORIES));
            yield put(createResourceFetchAction(Resource.TAGS));
            yield put(createResourceFetchAction(Resource.PREFERENCES));
            yield put(createFetchVersionsAction());

            history.replace(AppRoutes.HOME);
        } else {
            yield put(loginFailAction());
            yield put(showSnackbarAction(t`Login failed!`, 'error', 2000));
        }
    } catch (error) {
        yield put(loginFailAction());
    }
}

function* logoutSaga() {
    const api = new Api();
    try {
        yield apply(api, api.logout, []);
        yield put(logoutSuccessAction());
        yield put(showSnackbarAction(t`Logout successful!`, 'success', 2000));
        history.replace(AppRoutes.LOGIN);
    } catch (error) {
        yield put(logoutFailAction());
        yield put(showSnackbarAction(t`Logout failed!`, 'error', 2000));
    }
}

function* fetchVersionsSaga() {
    const api = new Api();
    try {
        const version: string = yield apply(api, api.fetchVersion, []);
        const apiVersion: string = yield apply(api, api.fetchApiVersion, []);
        yield put(createSetVersionsAction(version, apiVersion));
    } catch (error) {
        const { status } = error as ApiError;
        if (status === 403) {
            history.replace(AppRoutes.LOGIN);
        }
        yield put(createSetVersionsAction('unknown', 'unknown'));
    }
}

function* sessionSaga() {
    yield takeLatest(SessionActions.LOGIN, loginSaga);
    yield takeLatest(SessionActions.LOGOUT, logoutSaga);
    yield takeLatest(SessionActions.FETCH_VERSIONS, fetchVersionsSaga);
}

export default sessionSaga;
