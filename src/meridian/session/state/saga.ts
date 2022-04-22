import { t } from '@lingui/macro';
import { apply, put, takeLatest } from 'redux-saga/effects';
import { Api } from 'meridian/api';
import { LoginResponse } from 'meridian/models';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';
import {
    BaseAction,
    createResourceFetchAction,
    Resource,
} from 'meridian/resource';
import { showSnackbarAction } from 'meridian/snackbar';
import {
    createFetchVersionsAction,
    createSetVersionsAction,
    LoginAction,
    loginFailAction,
    loginSuccessAction,
    logoutFailAction,
    logoutSuccessAction,
    SessionActions,
} from './actions';

function* loginSaga(action: LoginAction) {
    const api = Api.getInstance();
    try {
        const response: LoginResponse = yield apply(api, api.login, [
            action.username,
            action.password,
        ]);
        if (response === LoginResponse.SUCCESS) {
            yield put(loginSuccessAction());
            yield put(
                showSnackbarAction(t`Login successful!`, 'success', 2000)
            );

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* logoutSaga(action: BaseAction) {
    const api = Api.getInstance();
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* fetchVersionsSaga(action: BaseAction) {
    const api = Api.getInstance();
    try {
        const version: string = yield apply(api, api.version, []);
        const apiVersion: string = yield apply(api, api.apiVersion, []);
        yield put(createSetVersionsAction(version, apiVersion));
    } catch (error) {
        yield put(createSetVersionsAction('unknown', 'unknown'));
    }
}

function* sessionSaga() {
    yield takeLatest(SessionActions.LOGIN, loginSaga);
    yield takeLatest(SessionActions.LOGOUT, logoutSaga);
    yield takeLatest(SessionActions.FETCH_VERSIONS, fetchVersionsSaga);
}

export default sessionSaga;
