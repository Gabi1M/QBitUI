import React from 'react';

import { call, takeLatest } from 'redux-saga/effects';
import { Check } from 'tabler-icons-react';

import { showNotification } from '@mantine/notifications';

import { ShowSnackbarAction, SnackbarAction } from './actions';

function* showSnackbarSaga(action: ShowSnackbarAction) {
    switch (action.variant) {
        case 'error': {
            yield call(showNotification, {
                message: action.text,
                autoClose: action.autoHideDuration,
                radius: 'lg',
                color: 'red',
                icon: <Check />,
            });
            return;
        }
        case 'success':
        default: {
            yield call(showNotification, {
                message: action.text,
                autoClose: action.autoHideDuration,
                radius: 'lg',
                color: 'green',
                icon: <Check />,
            });
        }
    }
}

function* snackbarSaga() {
    yield takeLatest(SnackbarAction.SHOW_SNACKBAR, showSnackbarSaga);
}

export default snackbarSaga;
