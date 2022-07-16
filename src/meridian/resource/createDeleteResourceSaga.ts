import { apply, put } from 'redux-saga/effects';

import { Api } from 'meridian/api';

import {
    ResourceDeleteAction,
    createResourceDeleteFailAction,
    createResourceDeleteSuccessAction,
    createResourceFetchAction,
} from './createResourceReducer';
import { Resource } from './types';

export const createDeleteResourceSaga = <T extends Resource = Resource>(resourceName: T) => {
    function* deleteResource(action: ResourceDeleteAction<T>) {
        const api = Api.getInstance();
        try {
            yield apply(api, api.deleteResource, [resourceName, action.params]);
            yield put(createResourceDeleteSuccessAction(resourceName, action.params));
            yield put(createResourceFetchAction(resourceName));
        } catch (error) {
            yield put(createResourceDeleteFailAction(resourceName, action.params, error as Error));
            throw error;
        }
    }

    return deleteResource;
};
