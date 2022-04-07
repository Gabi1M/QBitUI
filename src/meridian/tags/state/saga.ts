import {
    createDeleteResourceSaga,
    createFetchResourceSaga,
    createSetResourceSaga,
    Resource,
} from 'meridian/resource';
import { takeLatest } from 'redux-saga/effects';
import { TagsActions } from './reducer';

function* tagsSaga() {
    yield takeLatest(TagsActions.FETCH, createFetchResourceSaga(Resource.TAGS));
    yield takeLatest(TagsActions.POST, createSetResourceSaga(Resource.TAGS));
    yield takeLatest(
        TagsActions.DELETE,
        createDeleteResourceSaga(Resource.TAGS)
    );
}

export default tagsSaga;
