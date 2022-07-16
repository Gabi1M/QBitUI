import React from 'react';
import { useDispatch } from 'react-redux';

import { logoutAction } from 'meridian/session';

export const useLogout = () => {
    const dispatch = useDispatch();

    return React.useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);
};
