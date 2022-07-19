import { takeLatest } from 'redux-saga/effects';

import { Resource, createFetchResourceSaga } from 'meridian/resource';

import { TorrentPropertiesActions } from './reducer';

function* torrentPropertiesSaga() {
    yield takeLatest(
        TorrentPropertiesActions.FETCH,
        createFetchResourceSaga(Resource.TORRENT_PROPERTIES),
    );
}

export default torrentPropertiesSaga;
