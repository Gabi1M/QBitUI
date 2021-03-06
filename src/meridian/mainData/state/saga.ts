import { takeLatest } from 'redux-saga/effects';

import { Resource, createFetchResourceSaga } from 'meridian/resource';

import { MainDataActions } from './reducer';

function* mainDataSaga() {
    yield takeLatest(MainDataActions.FETCH, createFetchResourceSaga(Resource.MAIN_DATA));
}

export default mainDataSaga;
