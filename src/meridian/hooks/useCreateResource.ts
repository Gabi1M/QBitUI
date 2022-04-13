import {
    createResourceSetAction,
    Resource,
    SetResourceParams,
} from 'meridian/resource';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useCreateResource = <T extends Resource = Resource>(
    resourceName: T
) => {
    const dispatch = useDispatch();

    return React.useCallback(
        (params: SetResourceParams[T]) => {
            dispatch(createResourceSetAction(resourceName, params));
        },
        [dispatch, resourceName]
    );
};
