/* eslint-disable no-restricted-imports */
import { apply, put } from 'redux-saga/effects';

import { Api, ApiError } from 'meridian/api';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';

import {
    ResourceDeleteAction,
    createResourceDeleteFailAction,
    createResourceDeleteSuccessAction,
    createResourceFetchAction,
} from './createResourceReducer';
import { Resource } from './types';

export const createDeleteResourceSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* deleteResource(action: ResourceDeleteAction<T>) {
        const api = new Api();
        try {
            yield apply(api, api.deleteResource, [resourceName, action.params]);
            yield put(createResourceDeleteSuccessAction(resourceName, action.params));
            yield put(createResourceFetchAction(resourceName));
        } catch (error) {
            const { status } = error as ApiError;
            if (status === 403) {
                history.replace(AppRoutes.LOGIN);
            }
            yield put(createResourceDeleteFailAction(resourceName, action.params, error as Error));
            throw error;
        }
    }

    return deleteResource;
};
