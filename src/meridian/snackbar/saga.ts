import { apply, select, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { selectSettings } from 'meridian/settings';
import { Settings } from 'meridian/models';
import { ShowSnackbarAction, SnackbarAction } from './actions';

function* showSnackbarSaga(action: ShowSnackbarAction) {
    const settings: Settings = yield select(selectSettings);
    switch(action.variant) {
        case 'error': {
            yield apply(toast, toast.error, [action.text, { position: 'bottom-left', duration: action.autoHideDuration, style: {
                background: settings.darkMode ? '#333' : '#fff',
                color: settings.darkMode ? '#fff' : '#333'
            } }]);
            return;
        }
        case 'success':
        default: {
            yield apply(toast, toast.success, [action.text, { position: 'bottom-left', duration: action.autoHideDuration, style: {
                background: settings.darkMode ? '#333' : '#fff',
                color: settings.darkMode ? '#fff' : '#333'
            } }]);
            return;
        }
    }
}

function* snackbarSaga() {
    yield takeLatest(SnackbarAction.SHOW_SNACKBAR, showSnackbarSaga);
}

export default snackbarSaga;
