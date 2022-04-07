import { LocalStorage, LocalStorageKey } from 'meridian/localStorage';
import { Settings, TorrentFilters } from 'meridian/models';
import { createResourceFetchAction, Resource } from 'meridian/resource';
import { createSetSettingsAction } from 'meridian/settings';
import { createSetTorrentFiltersAction } from 'meridian/torrentFilters';
import { apply, call, put } from 'redux-saga/effects';

function* hydrateFromStorageSaga() {
    const settings: Settings = yield apply(
        LocalStorage,
        LocalStorage.getValue,
        [LocalStorageKey.SETTINGS]
    );
    if (settings) {
        yield put(createSetSettingsAction(settings));
    }
    const torrentFilters: TorrentFilters = yield apply(
        LocalStorage,
        LocalStorage.getValue,
        [LocalStorageKey.TORRENT_FILTERS]
    );
    if (torrentFilters) {
        yield put(createSetTorrentFiltersAction(torrentFilters));
    }
}

function* startupSaga() {
    yield call(hydrateFromStorageSaga);
    yield put(createResourceFetchAction(Resource.CATEGORIES));
    yield put(createResourceFetchAction(Resource.TAGS));
    yield put(createResourceFetchAction(Resource.PREFERENCES));
}

export default startupSaga;
