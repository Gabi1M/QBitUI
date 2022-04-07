import React from 'react';
import { loginAction } from 'meridian/session';
import { useDispatch } from 'react-redux';
import { useIsLoggedIn } from './useIsLoggedIn';

export const useLogin = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useIsLoggedIn();

    return React.useCallback(() => {
        if (!isLoggedIn) {
            dispatch(loginAction());
        }
    }, [dispatch, isLoggedIn]);
};
