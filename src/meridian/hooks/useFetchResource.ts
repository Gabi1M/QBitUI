import React from 'react';
import {
    createResourceFetchAction,
    FetchResourceParams,
    Resource,
} from 'meridian/resource';
import { useDispatch } from 'react-redux';
import { useIsLoggedIn } from './useIsLoggedIn';
import { useLogin } from './useLogin';

export const useFetchResource = <T extends Resource = Resource>(
    resourceName: T
) => {
    const dispatch = useDispatch();
    const isLoggedIn = useIsLoggedIn();
    const login = useLogin();

    return React.useCallback(
        (params?: FetchResourceParams[T]) => {
            if (!isLoggedIn) {
                login();
            }

            dispatch(createResourceFetchAction(resourceName, params));
        },
        [dispatch, login, isLoggedIn, resourceName]
    );
};
