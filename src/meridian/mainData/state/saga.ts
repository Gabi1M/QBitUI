import { createFetchResourceSaga, Resource } from 'meridian/resource';
import { takeLatest } from 'redux-saga/effects';
import { MainDataActions } from './reducer';

function* mainDataSaga() {
    yield takeLatest(
        MainDataActions.FETCH,
        createFetchResourceSaga(Resource.MAIN_DATA)
    );
}

export default mainDataSaga;
