import {
    createResourceDeleteAction,
    DeleteResourceParams,
    Resource,
} from 'meridian/resource';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useDeleteResource = <T extends Resource = Resource>(
    resourceName: T
) => {
    const dispatch = useDispatch();

    return React.useCallback(
        (params: DeleteResourceParams[T]) => {
            dispatch(createResourceDeleteAction(resourceName, params));
        },
        [dispatch, resourceName]
    );
};
