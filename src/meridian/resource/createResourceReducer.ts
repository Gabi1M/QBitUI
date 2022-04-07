import { BaseAction } from './baseAction';
import {
    FetchResourceParams,
    Resource,
    ResourceDataType,
    SetResourceParams,
    DeleteResourceParams,
} from './types';

type ActionsType =
    | 'FETCH'
    | 'FETCH_SUCCESS'
    | 'FETCH_FAIL'
    | 'POST'
    | 'POST_SUCCESS'
    | 'POST_FAIL'
    | 'DELETE'
    | 'DELETE_SUCCESS'
    | 'DELETE_FAIL';

export type Actions = { [key in ActionsType]: string };

export type FetchResourceState<T extends Resource = Resource> = {
    data?: ResourceDataType[T];
    params?: FetchResourceParams[T];
    error?: Error;
};

export type SetResourceState<T extends Resource = Resource> = {
    params?: SetResourceParams[T];
    error?: Error;
};

export type DeleteResourceState<T extends Resource = Resource> = {
    params?: DeleteResourceParams[T];
    error?: Error;
};

export type ResourceState<T extends Resource = Resource> = {
    fetch: FetchResourceState<T>;
    set: SetResourceState<T>;
    delete: DeleteResourceState<T>;
};

export type ResourceReducer<T extends Resource = Resource> = (
    state: ResourceState<T> | undefined,
    action: ResourceAction<T>
) => ResourceState<T>;

export type CreatedResourceReducer<T extends Resource = Resource> = {
    reducer: ResourceReducer<T>;
    actions: Actions;
};

export type ResourceFetchAction<T extends Resource = Resource> = BaseAction & {
    params?: FetchResourceParams[T];
};

export type ResourceFetchSuccessAction<T extends Resource = Resource> =
    BaseAction & {
        data: ResourceDataType[T];
    };

export type ResourceFetchFailAction<T extends Resource = Resource> =
    ResourceFetchAction<T> & {
        error: Error;
    };

export type ResourceSetAction<T extends Resource = Resource> = BaseAction & {
    params: SetResourceParams[T];
};

export type ResourceSetSuccessAction<T extends Resource = Resource> =
    ResourceSetAction<T>;

export type ResourceSetFailAction<T extends Resource = Resource> =
    ResourceSetAction<T> & {
        error: Error;
    };

export type ResourceDeleteAction<T extends Resource = Resource> = BaseAction & {
    params: DeleteResourceParams[T];
};

export type ResourceDeleteSuccessAction<T extends Resource = Resource> =
    ResourceDeleteAction<T>;

export type ResourceDeleteFailAction<T extends Resource = Resource> =
    ResourceDeleteAction<T> & {
        error: Error;
    };

export type ResourceAction<T extends Resource = Resource> =
    | ResourceFetchAction<T>
    | ResourceFetchSuccessAction<T>
    | ResourceFetchFailAction<T>
    | ResourceSetAction<T>
    | ResourceSetSuccessAction<T>
    | ResourceSetFailAction<T>
    | ResourceDeleteAction<T>
    | ResourceDeleteSuccessAction<T>
    | ResourceDeleteFailAction<T>;

export const createResourceFetchAction = <T extends Resource = Resource>(
    resourceName: T,
    params?: FetchResourceParams[T]
): ResourceFetchAction<T> => ({
    type: `${resourceName.toUpperCase()}/FETCH`,
    params,
});

export const createResourceFetchSuccessAction = <T extends Resource = Resource>(
    resourceName: T,
    data: ResourceDataType[T]
): ResourceFetchSuccessAction<T> => ({
    type: `${resourceName.toUpperCase()}/FETCH_SUCCESS`,
    data,
});

export const createResourceFetchFailAction = <T extends Resource = Resource>(
    resourceName: T,
    params: FetchResourceParams[T],
    error: Error
): ResourceFetchFailAction<T> => ({
    type: `${resourceName.toUpperCase()}/FETCH_FAIL`,
    params,
    error,
});

export const createResourceSetAction = <T extends Resource = Resource>(
    resourceName: T,
    params: SetResourceParams[T]
): ResourceSetAction<T> => ({
    type: `${resourceName.toUpperCase()}/POST`,
    params,
});

export const createResourceSetSuccessAction = <T extends Resource = Resource>(
    resourceName: T,
    params: SetResourceParams[T]
): ResourceSetSuccessAction<T> => ({
    type: `${resourceName.toUpperCase()}/POST_SUCCESS`,
    params,
});

export const createResourceSetFailAction = <T extends Resource = Resource>(
    resourceName: T,
    params: SetResourceParams[T],
    error: Error
): ResourceSetFailAction<T> => ({
    type: `${resourceName.toUpperCase()}/POST_FAIL`,
    params,
    error,
});

export const createResourceDeleteAction = <T extends Resource = Resource>(
    resourceName: T,
    params: DeleteResourceParams[T]
): ResourceDeleteAction<T> => ({
    type: `${resourceName.toUpperCase()}/DELETE`,
    params,
});

export const createResourceDeleteSuccessAction = <
    T extends Resource = Resource
>(
    resourceName: T,
    params: DeleteResourceParams[T]
): ResourceDeleteSuccessAction<T> => ({
    type: `${resourceName.toUpperCase()}/DELETE_SUCCESS`,
    params,
});

export const createResourceDeleteFailAction = <T extends Resource = Resource>(
    resourceName: T,
    params: DeleteResourceParams[T],
    error: Error
): ResourceDeleteFailAction<T> => ({
    type: `${resourceName.toUpperCase()}/DELETE_FAIL`,
    params,
    error,
});

export const createResourceReducer = <T extends Resource = Resource>(
    resource: T
): CreatedResourceReducer<T> => {
    const reducerName = resource.toUpperCase();
    const actions = Object.freeze({
        FETCH: `${reducerName}/FETCH`,
        FETCH_SUCCESS: `${reducerName}/FETCH_SUCCESS`,
        FETCH_FAIL: `${reducerName}/FETCH_FAIL`,
        POST: `${reducerName}/POST`,
        POST_SUCCESS: `${reducerName}/POST_SUCCESS`,
        POST_FAIL: `${reducerName}/POST_FAIL`,
        DELETE: `${reducerName}/DELETE`,
        DELETE_SUCCESS: `${reducerName}/DELETE_SUCCESS`,
        DELETE_FAIL: `${reducerName}/DELETE_FAIL`,
    });

    const initialState: ResourceState<T> = {
        fetch: {},
        set: {},
        delete: {},
    };

    const reducer = (
        state: ResourceState<T> = initialState,
        action: ResourceAction<T>
    ) => {
        switch (action.type) {
            case actions.FETCH_SUCCESS: {
                const fetchSuccessAction =
                    action as ResourceFetchSuccessAction<T>;
                return {
                    ...state,
                    fetch: {
                        ...state.fetch,
                        data: fetchSuccessAction.data,
                        error: undefined,
                    },
                };
            }
            case actions.FETCH_FAIL: {
                const fetchFailAction = action as ResourceFetchFailAction;
                return {
                    ...state,
                    fetch: {
                        ...state.fetch,
                        data: undefined,
                        params: fetchFailAction.params,
                        error: fetchFailAction.error,
                    },
                };
            }
            case actions.POST_SUCCESS: {
                const postSuccessAction = action as ResourceSetAction<T>;
                return {
                    ...state,
                    set: {
                        ...state.set,
                        params: postSuccessAction.params,
                        error: undefined,
                    },
                };
            }
            case actions.POST_FAIL: {
                const postFailAction = action as ResourceSetFailAction<T>;
                return {
                    ...state,
                    set: {
                        ...state.set,
                        params: postFailAction.params,
                        error: postFailAction.error,
                    },
                };
            }
            case actions.DELETE_SUCCESS: {
                const deleteSuccessAction =
                    action as ResourceDeleteSuccessAction<T>;
                return {
                    ...state,
                    delete: {
                        ...state.delete,
                        params: deleteSuccessAction.params,
                        error: undefined,
                    },
                };
            }
            case actions.DELETE_FAIL: {
                const deleteFailAction = action as ResourceDeleteFailAction<T>;
                return {
                    ...state,
                    delete: {
                        ...state.delete,
                        params: deleteFailAction.params,
                        error: deleteFailAction.error,
                    },
                };
            }
            default: {
                return state;
            }
        }
    };

    return {
        reducer,
        actions,
    };
};
