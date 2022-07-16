import { takeLatest } from 'redux-saga/effects';

import { Resource, createFetchResourceSaga } from 'meridian/resource';

import { TorrentTrackersActions } from './reducer';

function* torrentTrackersSaga() {
    yield takeLatest(
        TorrentTrackersActions.FETCH,
        createFetchResourceSaga(Resource.TORRENT_TRACKERS),
    );
}

export default torrentTrackersSaga;
