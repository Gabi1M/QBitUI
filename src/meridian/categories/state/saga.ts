import {
    createDeleteResourceSaga,
    createFetchResourceSaga,
    createSetResourceSaga,
    Resource,
} from 'meridian/resource';
import { takeLatest } from 'redux-saga/effects';
import { CategoriesActions } from './reducer';

function* categoriesSaga() {
    yield takeLatest(
        CategoriesActions.FETCH,
        createFetchResourceSaga(Resource.CATEGORIES)
    );
    yield takeLatest(
        CategoriesActions.POST,
        createSetResourceSaga(Resource.CATEGORIES)
    );
    yield takeLatest(
        CategoriesActions.DELETE,
        createDeleteResourceSaga(Resource.CATEGORIES)
    );
}

export default categoriesSaga;
