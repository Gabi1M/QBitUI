import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { logoutAction } from 'meridian/session';

export const useLogout = () => {
    const dispatch = useDispatch();

    return useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);
};
