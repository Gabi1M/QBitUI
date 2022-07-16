import { createFetchResourceSaga, Resource } from 'meridian/resource';
import { takeLatest } from 'redux-saga/effects';
import { TorrentContentActions } from './reducer';

function* torrentContentSaga() {
    yield takeLatest(
        TorrentContentActions.FETCH,
        createFetchResourceSaga(Resource.TORRENT_CONTENT),
    );
}

export default torrentContentSaga;
