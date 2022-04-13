import React from 'react';
import {
    createResourceFetchAction,
    FetchResourceParams,
    Resource,
} from 'meridian/resource';
import { useDispatch } from 'react-redux';

export const useFetchResource = <T extends Resource = Resource>(
    resourceName: T
) => {
    const dispatch = useDispatch();

    return React.useCallback(
        (params?: FetchResourceParams[T]) => {
            dispatch(createResourceFetchAction(resourceName, params));
        },
        [dispatch, resourceName]
    );
};
