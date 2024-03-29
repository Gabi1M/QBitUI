import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DeleteResourceParams, Resource, createResourceDeleteAction } from 'meridian/resource';

export const useDeleteResource = <T extends Resource = Resource>(resourceName: T) => {
    const dispatch = useDispatch();

    return useCallback(
        (params: DeleteResourceParams[T]) => {
            dispatch(createResourceDeleteAction(resourceName, params));
        },
        [dispatch, resourceName],
    );
};
