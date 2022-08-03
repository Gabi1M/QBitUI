import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { loginAction } from 'meridian/session';

export const useLogin = () => {
    const dispatch = useDispatch();

    return useCallback(
        (username: string, password: string) => {
            dispatch(loginAction(username, password));
        },
        [dispatch],
    );
};
