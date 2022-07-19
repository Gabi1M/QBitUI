import { takeLatest } from 'redux-saga/effects';

import { Resource, createFetchResourceSaga } from 'meridian/resource';

import { TransferInfoActions } from './reducer';

function* transferInfoSaga() {
    yield takeLatest(TransferInfoActions.FETCH, createFetchResourceSaga(Resource.TRANSFER_INFO));
}

export default transferInfoSaga;
