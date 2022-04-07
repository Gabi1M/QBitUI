import {
    createResourceDeleteAction,
    DeleteResourceParams,
    Resource,
} from 'meridian/resource';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useIsLoggedIn } from './useIsLoggedIn';
import { useLogin } from './useLogin';

export const useDeleteResource = <T extends Resource = Resource>(
    resourceName: T
) => {
    const dispatch = useDispatch();
    const isLoggedIn = useIsLoggedIn();
    const login = useLogin();

    return React.useCallback(
        (params: DeleteResourceParams[T]) => {
            if (!isLoggedIn) {
                login();
            }

            dispatch(createResourceDeleteAction(resourceName, params));
        },
        [dispatch, login, isLoggedIn, resourceName]
    );
};
