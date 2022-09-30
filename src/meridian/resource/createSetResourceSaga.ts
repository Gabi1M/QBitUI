import { apply, put } from 'redux-saga/effects';

import { Api } from 'meridian/api';

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
            yield put(createResourceSetFailAction(resourceName, action.params, error as Error));
            throw error;
        }
    }

    return setResource;
};
