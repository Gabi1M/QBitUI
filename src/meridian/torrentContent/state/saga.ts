import { takeLatest } from 'redux-saga/effects';

import { Resource, createFetchResourceSaga } from 'meridian/resource';

import { TorrentContentActions } from './reducer';

function* torrentContentSaga() {
    yield takeLatest(
        TorrentContentActions.FETCH,
        createFetchResourceSaga(Resource.TORRENT_CONTENT),
    );
}

export default torrentContentSaga;
