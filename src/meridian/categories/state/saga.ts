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

import { CategoriesActions } from './reducer';

function* setCategoriesSaga(action: ResourceSetAction<Resource.CATEGORIES>) {
    try {
        yield call(createSetResourceSaga(Resource.CATEGORIES), action);
        yield put(createResourceFetchAction(Resource.CATEGORIES));
        yield put(showSnackbarAction(t`Categories added successfully!`, 'success', 2000));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to add categories!`, 'success', 2000));
    }
}

function* deleteCategoriesSaga(action: ResourceDeleteAction<Resource.CATEGORIES>) {
    try {
        yield call(createDeleteResourceSaga(Resource.CATEGORIES), action);
        yield put(createResourceFetchAction(Resource.CATEGORIES));
        yield put(showSnackbarAction(t`Categories deleted successfully!`, 'success', 2000));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to delete categories!`, 'error', 2000));
    }
}

function* categoriesSaga() {
    yield takeLatest(CategoriesActions.FETCH, createFetchResourceSaga(Resource.CATEGORIES));
    yield takeLatest(CategoriesActions.POST, setCategoriesSaga);
    yield takeLatest(CategoriesActions.DELETE, deleteCategoriesSaga);
}

export default categoriesSaga;
