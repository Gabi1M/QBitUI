import { Api } from 'meridian/api';
import { apply, put } from 'redux-saga/effects';
import {
    ResourceFetchAction,
    createResourceFetchSuccessAction,
    createResourceFetchFailAction,
} from './createResourceReducer';
import { Resource, ResourceDataType } from './types';

export const createFetchResourceSaga = <T extends Resource = Resource>(
    resourceName: T
) => {
    function* fetchResource(action: ResourceFetchAction<T>) {
        const api = Api.getInstance();
        try {
            const data: ResourceDataType[T] = yield apply(
                api,
                api.fetchResource,
                [resourceName, action.params]
            );
            yield put(createResourceFetchSuccessAction(resourceName, data));
        } catch (error) {
            yield put(
                createResourceFetchFailAction(
                    resourceName,
                    action.params,
                    error as Error
                )
            );
        }
    }

    return fetchResource;
};
