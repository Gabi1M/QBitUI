import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Resource, SetResourceParams, createResourceSetAction } from 'meridian/resource';

export const useCreateResource = <T extends Resource = Resource>(resourceName: T) => {
    const dispatch = useDispatch();

    return useCallback(
        (params: SetResourceParams[T]) => {
            dispatch(createResourceSetAction(resourceName, params));
        },
        [dispatch, resourceName],
    );
};
