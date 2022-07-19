import { apply, call, put } from 'redux-saga/effects';

import { LocalStorage, LocalStorageKey } from 'meridian/localStorage';
import { Settings, TorrentFilters } from 'meridian/models';
import { Resource, createResourceFetchAction } from 'meridian/resource';
import { createFetchVersionsAction } from 'meridian/session';
import { createSetSettingsAction } from 'meridian/settings';
import { createSetTorrentFiltersAction } from 'meridian/torrentFilters';

function* hydrateFromStorageSaga() {
    const settings: Settings = yield apply(LocalStorage, LocalStorage.getValue, [
        LocalStorageKey.SETTINGS,
    ]);
    if (settings) {
        yield put(createSetSettingsAction(settings));
    }
    const torrentFilters: TorrentFilters = yield apply(LocalStorage, LocalStorage.getValue, [
        LocalStorageKey.TORRENT_FILTERS,
    ]);
    if (torrentFilters) {
        yield put(createSetTorrentFiltersAction(torrentFilters));
    }
}

function* startupSaga() {
    yield call(hydrateFromStorageSaga);
    yield put(createResourceFetchAction(Resource.CATEGORIES));
    yield put(createResourceFetchAction(Resource.TAGS));
    yield put(createResourceFetchAction(Resource.PREFERENCES));
    yield put(createFetchVersionsAction());
}

export default startupSaga;
