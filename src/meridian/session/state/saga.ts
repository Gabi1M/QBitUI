import { apply, put, takeLatest } from 'redux-saga/effects';
import { Api } from 'meridian/api';
import { LoginResponse } from 'meridian/models';
import {
    LoginAction,
    loginFailAction,
    loginSuccessAction,
    SessionActions,
} from './actions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* loginSaga(action: LoginAction) {
    const api = Api.getInstance();
    try {
        const response: LoginResponse = yield apply(api, api.login, []);
        yield put(
            response === LoginResponse.SUCCESS
                ? loginSuccessAction()
                : loginFailAction()
        );
    } catch (error) {
        yield put(loginFailAction());
    }
}

function* sessionSaga() {
    yield takeLatest(SessionActions.LOGIN, loginSaga);
}

export default sessionSaga;
