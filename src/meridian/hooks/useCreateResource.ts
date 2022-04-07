import {
    createResourceSetAction,
    Resource,
    SetResourceParams,
} from 'meridian/resource';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useIsLoggedIn } from './useIsLoggedIn';
import { useLogin } from './useLogin';

export const useCreateResource = <T extends Resource = Resource>(
    resourceName: T
) => {
    const dispatch = useDispatch();
    const isLoggedIn = useIsLoggedIn();
    const login = useLogin();

    return React.useCallback(
        (params: SetResourceParams[T]) => {
            if (!isLoggedIn) {
                login();
            }

            dispatch(createResourceSetAction(resourceName, params));
        },
        [dispatch, login, isLoggedIn, resourceName]
    );
};
