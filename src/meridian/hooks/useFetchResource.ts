import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { FetchResourceParams, Resource, createResourceFetchAction } from 'meridian/resource';

export const useFetchResource = <T extends Resource = Resource>(resourceName: T) => {
    const dispatch = useDispatch();

    return useCallback(
        (params?: FetchResourceParams[T]) => {
            dispatch(createResourceFetchAction(resourceName, params));
        },
        [dispatch, resourceName],
    );
};
