/* eslint-disable no-restricted-imports */
import { apply, put } from 'redux-saga/effects';

import { Api, ApiError } from 'meridian/api';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';

import {
    ResourceSetAction,
    createResourceFetchAction,
    createResourceSetFailAction,
    createResourceSetSuccessAction,
} from './createResourceReducer';
import { Resource } from './types';

export const createSetResourceSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* setResource(action: ResourceSetAction<T>) {
        const api = new Api();
        try {
            yield apply(api, api.setResource, [resourceName, action.params]);
            yield put(createResourceSetSuccessAction(resourceName, action.params));
            yield put(createResourceFetchAction(resourceName));
        } catch (error) {
            const { status } = error as ApiError;
            if (status === 403) {
                history.replace(AppRoutes.LOGIN);
            }
            yield put(createResourceSetFailAction(resourceName, action.params, error as Error));
            throw error;
        }
    }

    return setResource;
};
