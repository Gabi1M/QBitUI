import { t } from '@lingui/macro';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
    Resource,
    ResourceDeleteAction,
    ResourceSetAction,
    createDeleteResourceSaga,
    createFetchResourceSaga,
    createResourceFetchAction,
    createSetResourceSaga,
} from 'meridian/resource';
import { showSnackbarAction } from 'meridian/snackbar';

import { TagsActions } from './reducer';

function* setTagsSaga(action: ResourceSetAction<Resource.TAGS>) {
    try {
        yield call(createSetResourceSaga(Resource.TAGS), action);
        yield put(createResourceFetchAction(Resource.TAGS));
        yield put(showSnackbarAction(t`Tags added successfully!`, 'success', 2000));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to add tags!`, 'error', 2000));
    }
}

function* deleteTagsSaga(action: ResourceDeleteAction<Resource.TAGS>) {
    try {
        yield call(createDeleteResourceSaga(Resource.TAGS), action);
        yield put(createResourceFetchAction(Resource.TAGS));
        yield put(showSnackbarAction(t`Tags deleted successfully!`, 'success', 2000));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to delete tags!`, 'error', 2000));
    }
}

function* tagsSaga() {
    yield takeLatest(TagsActions.FETCH, createFetchResourceSaga(Resource.TAGS));
    yield takeLatest(TagsActions.POST, setTagsSaga);
    yield takeLatest(TagsActions.DELETE, deleteTagsSaga);
}

export default tagsSaga;
