import { createFetchResourceSaga, Resource } from 'meridian/resource';
import { takeLatest } from 'redux-saga/effects';
import { TorrentPropertiesActions } from './reducer';

function* torrentPropertiesSaga() {
    yield takeLatest(
        TorrentPropertiesActions.FETCH,
        createFetchResourceSaga(Resource.TORRENT_PROPERTIES)
    );
}

export default torrentPropertiesSaga;
