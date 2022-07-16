import { t } from '@lingui/macro';
import {
    createFetchResourceSaga,
    createResourceFetchAction,
    createSetResourceSaga,
    Resource,
    ResourceSetAction,
} from 'meridian/resource';
import { call, put, takeLatest } from 'redux-saga/effects';
import { showSnackbarAction } from 'meridian/snackbar';
import { PreferencesActions } from './reducer';

function* setPreferencesSaga(action: ResourceSetAction<Resource.PREFERENCES>) {
    try {
        yield call(createSetResourceSaga(Resource.PREFERENCES), action);
        yield put(createResourceFetchAction(Resource.PREFERENCES));
        yield put(showSnackbarAction(t`Preferences saved successfully!`, 'success', 2000));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to save preferences!`, 'error', 2000));
    }
}

function* preferencesSaga() {
    yield takeLatest(PreferencesActions.FETCH, createFetchResourceSaga(Resource.PREFERENCES));
    yield takeLatest(PreferencesActions.POST, setPreferencesSaga);
}

export default preferencesSaga;
