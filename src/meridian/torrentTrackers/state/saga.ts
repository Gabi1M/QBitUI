import { createFetchResourceSaga, Resource } from 'meridian/resource';
import { takeLatest } from 'redux-saga/effects';
import { TorrentTrackersActions } from './reducer';

function* torrentTrackersSaga() {
    yield takeLatest(
        TorrentTrackersActions.FETCH,
        createFetchResourceSaga(Resource.TORRENT_TRACKERS),
    );
}

export default torrentTrackersSaga;
