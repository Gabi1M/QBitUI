import { apply, put, takeLatest } from 'redux-saga/effects';
import { Api } from 'meridian/api';
import { LoginResponse } from 'meridian/models';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';
import { BaseAction } from 'meridian/resource';
import { showSnackbarAction } from 'meridian/snackbar';
import {
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
            yield put(showSnackbarAction('Login successful!', 'success', 2000));
            history.replace(AppRoutes.HOME);
        } else {
            yield put(loginFailAction());
            yield put(showSnackbarAction('Login failed!', 'error', 2000));
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
        yield put(showSnackbarAction('Logout successful!', 'success', 2000));
        history.replace(AppRoutes.LOGIN);
    } catch (error) {
        yield put(logoutFailAction());
        yield put(showSnackbarAction('Logout failed!', 'error', 2000));
    }
}

function* sessionSaga() {
    yield takeLatest(SessionActions.LOGIN, loginSaga);
    yield takeLatest(SessionActions.LOGOUT, logoutSaga);
}

export default sessionSaga;
