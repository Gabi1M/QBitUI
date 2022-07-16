import React from 'react';
import { loginAction } from 'meridian/session';
import { useDispatch } from 'react-redux';

export const useLogin = () => {
    const dispatch = useDispatch();

    return React.useCallback(
        (username: string, password: string) => {
            dispatch(loginAction(username, password));
        },
        [dispatch],
    );
};
