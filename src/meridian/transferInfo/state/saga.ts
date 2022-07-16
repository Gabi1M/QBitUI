import { createFetchResourceSaga, Resource } from 'meridian/resource';
import { takeLatest } from 'redux-saga/effects';
import { TransferInfoActions } from './reducer';

function* transferInfoSaga() {
    yield takeLatest(TransferInfoActions.FETCH, createFetchResourceSaga(Resource.TRANSFER_INFO));
}

export default transferInfoSaga;
