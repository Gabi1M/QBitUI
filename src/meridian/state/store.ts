import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { categoriesReducer, categoriesSaga } from 'meridian/categories';
import { mainDataReducer, mainDataSaga } from 'meridian/mainData';
import { preferencesReducer, preferencesSaga } from 'meridian/preferences';
import { sessionReducer, sessionSaga } from 'meridian/session';
import { settingsReducer } from 'meridian/settings';
import { snackbarSaga } from 'meridian/snackbar';
import { tagsReducer, tagsSaga } from 'meridian/tags';
import { torrentReducer, torrentSaga } from 'meridian/torrent';
import { torrentContentReducer, torrentContentSaga } from 'meridian/torrentContent';
import { torrentFiltersReducer } from 'meridian/torrentFilters';
import { torrentPropertiesReducer, torrentPropertiesSaga } from 'meridian/torrentProperties';
import { torrentTrackersReducer, torrentTrackersSaga } from 'meridian/torrentTrackers';
import { transferInfoReducer, transferInfoSaga } from 'meridian/transferInfo';

import { startupSaga } from './sagas';
import { GlobalState } from './types';

export const createStore = () => {
    const appSagas = [
        snackbarSaga,
        sessionSaga,
        mainDataSaga,
        torrentPropertiesSaga,
        torrentContentSaga,
        torrentTrackersSaga,
        torrentSaga,
        transferInfoSaga,
        preferencesSaga,
        categoriesSaga,
        tagsSaga,
        startupSaga,
    ];

    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(
        combineReducers<GlobalState>({
            mainDataState: mainDataReducer,
            torrentPropertiesState: torrentPropertiesReducer,
            torrentContentState: torrentContentReducer,
            torrentTrackersState: torrentTrackersReducer,
            torrentState: torrentReducer,
            torrentFiltersState: torrentFiltersReducer,
            sessionState: sessionReducer,
            settingsState: settingsReducer,
            transferInfoState: transferInfoReducer,
            preferencesState: preferencesReducer,
            categoriesState: categoriesReducer,
            tagsState: tagsReducer,
        }),
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );

    appSagas.forEach((saga) => sagaMiddleware.run(saga));
    return store;
};
