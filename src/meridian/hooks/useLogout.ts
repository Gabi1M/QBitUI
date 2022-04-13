import React from 'react';
import { logoutAction } from 'meridian/session';
import { useDispatch } from 'react-redux';

export const useLogout = () => {
    const dispatch = useDispatch();

    return React.useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);
};
