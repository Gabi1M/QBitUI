import { t } from '@lingui/macro';
import { apply, put, takeLatest } from 'redux-saga/effects';

import { Api } from 'meridian/api';
import {
    Resource,
    ResourceSetAction,
    createFetchResourceSaga,
    createResourceFetchAction,
    createResourceSetFailAction,
    createResourceSetSuccessAction,
} from 'meridian/resource';
import { showSnackbarAction } from 'meridian/snackbar';

import {
    AddTorrentsTagsAction,
    DeleteTorrentsAction,
    ForceDownloadTorrentsAction,
    PauseTorrentsAction,
    RecheckTorrentsAction,
    RemoveTorrentsTagsAction,
    ResumeTorrentsAction,
    SetTorrentCategoryAction,
    TorrentActions,
} from './reducer';

function* pauseTorrentsSaga(action: PauseTorrentsAction) {
    const api = new Api();
    try {
        yield apply(api, api.pauseTorrents, [action.hashes]);
        yield put(showSnackbarAction(t`Torrents paused successfully!`, 'success', 2000));
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to pause torrents!`, 'error', 2000));
    }
}

function* resumeTorrentsSaga(action: ResumeTorrentsAction) {
    const api = new Api();
    try {
        yield apply(api, api.resumeTorrents, [action.hashes]);
        yield put(showSnackbarAction(t`Torrents resumed successfully!`, 'success', 2000));
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to resume torrents!`, 'error', 2000));
    }
}

function* deleteTorrentsSaga(action: DeleteTorrentsAction) {
    const api = new Api();
    try {
        yield apply(api, api.deleteTorrents, [action.hashes, action.deleteFiles]);
        yield put(showSnackbarAction(t`Torrents deleted successfully!`, 'success', 2000));
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to delete torrents!`, 'error', 2000));
    }
}

function* forceDownloadTorrentsSaga(action: ForceDownloadTorrentsAction) {
    const api = new Api();
    try {
        yield apply(api, api.forceDownloadTorrents, [action.hashes]);
        yield put(
            showSnackbarAction(t`Torrents successfully set to force download!`, 'success', 2000),
        );
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to set torrents to force download!`, 'error', 2000));
    }
}

function* recheckTorrentsSaga(action: RecheckTorrentsAction) {
    const api = new Api();
    try {
        yield apply(api, api.recheckTorrents, [action.hashes]);
        yield put(
            showSnackbarAction(
                t`Recheck successfully submited for the selected torrents!`,
                'success',
                2000,
            ),
        );
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to submit torrents recheck!`, 'error', 2000));
    }
}

function* setTorrentCategorySaga(action: SetTorrentCategoryAction) {
    const api = new Api();
    try {
        yield apply(api, api.setTorrentCategory, [action.hashes, action.categoryName]);
        yield put(showSnackbarAction(t`Category set successfully!`, 'success', 2000));
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to set category!`, 'error', 2000));
    }
}

function* addTorrentsTagsSaga(action: AddTorrentsTagsAction) {
    const api = new Api();
    try {
        yield apply(api, api.addTorrentsTags, [action.hashes, action.tags]);
        yield put(showSnackbarAction(t`Tags set successfully!`, 'success', 2000));
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to set tags!`, 'error', 2000));
    }
}

function* removeTorrentsTagsSaga(action: RemoveTorrentsTagsAction) {
    const api = new Api();
    try {
        yield apply(api, api.removeTorrentsTags, [action.hashes, action.tags]);
        yield put(showSnackbarAction(t`Tags removed successfully!`, 'success', 2000));
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(showSnackbarAction(t`Failed to remove tags!`, 'error', 2000));
    }
}

function* setTorrentSaga(action: ResourceSetAction<Resource.TORRENT>) {
    const paramsWithoutTorrents = {
        ...action.params,
        torrents: [],
    };
    try {
        const api = new Api();
        yield apply(api, api.setResource, [Resource.TORRENT, action.params]);
        yield put(createResourceSetSuccessAction(Resource.TORRENT, paramsWithoutTorrents)); // passing the blobs here will result in a state mutation somehow
        yield put(showSnackbarAction(t`Torrents added successfully!`, 'success', 2000));
        yield put(createResourceFetchAction(Resource.MAIN_DATA));
    } catch (error) {
        yield put(
            createResourceSetFailAction(Resource.TORRENT, paramsWithoutTorrents, error as Error),
        );
        yield put(showSnackbarAction(t`Failed to add torrents!`, 'error', 2000));
    }
}

function* torrentSaga() {
    yield takeLatest(TorrentActions.FETCH, createFetchResourceSaga(Resource.TORRENT));
    yield takeLatest(TorrentActions.POST, setTorrentSaga);
    yield takeLatest(TorrentActions.PAUSE_TORRENTS, pauseTorrentsSaga);
    yield takeLatest(TorrentActions.RESUME_TORRENTS, resumeTorrentsSaga);
    yield takeLatest(TorrentActions.DELETE_TORRENTS, deleteTorrentsSaga);
    yield takeLatest(TorrentActions.FORCE_DOWNLOAD_TORRENTS, forceDownloadTorrentsSaga);
    yield takeLatest(TorrentActions.RECHECK_TORRENTS, recheckTorrentsSaga);
    yield takeLatest(TorrentActions.SET_TORRENT_CATEGORY, setTorrentCategorySaga);
    yield takeLatest(TorrentActions.ADD_TORRENTS_TAGS, addTorrentsTagsSaga);
    yield takeLatest(TorrentActions.REMOVE_TORRENTS_TAGS, removeTorrentsTagsSaga);
}

export default torrentSaga;
