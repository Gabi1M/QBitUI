/* eslint-disable no-restricted-imports */
import { apply, put } from 'redux-saga/effects';

import { Api, ApiError } from 'meridian/api';
import { history } from 'meridian/navigation/history';
import { AppRoutes } from 'meridian/navigation/types';

import {
    ResourceFetchAction,
    createResourceFetchFailAction,
    createResourceFetchSuccessAction,
} from './createResourceReducer';
import { Resource, ResourceDataType } from './types';

export const createFetchResourceSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* fetchResource(action: ResourceFetchAction<T>) {
        const api = new Api();
        try {
            const data: ResourceDataType[T] = yield apply(api, api.fetchResource, [
                resourceName,
                action.params,
            ]);
            yield put(createResourceFetchSuccessAction(resourceName, data, action.params));
        } catch (error) {
            const { status } = error as ApiError;
            if (status === 403) {
                history.replace(AppRoutes.LOGIN);
            }
            yield put(createResourceFetchFailAction(resourceName, action.params, error as Error));
        }
    }

    return fetchResource;
};
