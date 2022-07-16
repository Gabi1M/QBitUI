import { applyMiddleware, combineReducers, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { snackbarSaga } from 'meridian/snackbar';
import { torrentReducer, torrentSaga } from 'meridian/torrent';
import { torrentPropertiesReducer, torrentPropertiesSaga } from 'meridian/torrentProperties';
import { transferInfoReducer, transferInfoSaga } from 'meridian/transferInfo';
import { preferencesReducer, preferencesSaga } from 'meridian/preferences';
import { categoriesReducer, categoriesSaga } from 'meridian/categories';
import { tagsReducer, tagsSaga } from 'meridian/tags';
import { sessionReducer, sessionSaga } from 'meridian/session';
import { settingsReducer } from 'meridian/settings';
import { torrentFiltersReducer } from 'meridian/torrentFilters';
import { composeWithDevTools } from '@redux-devtools/extension';
import { mainDataReducer, mainDataSaga } from 'meridian/mainData';
import { torrentContentReducer, torrentContentSaga } from 'meridian/torrentContent';
import { torrentTrackersReducer, torrentTrackersSaga } from 'meridian/torrentTrackers';
import { GlobalState } from './types';
import { startupSaga } from './sagas';

export const createStore = () => {
    const appSagas = [
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
    sagaMiddleware.run(snackbarSaga);
    return store;
};
