import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createSetSettingsAction, selectSettings } from 'meridian/settings';

export const useToggleTheme = () => {
    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();

    const theme = settings.darkMode ? 'dark' : 'light';
    const toggleTheme = useCallback(() => {
        dispatch(
            createSetSettingsAction({
                ...settings,
                darkMode: !settings.darkMode,
            }),
        );
    }, [dispatch, settings]);

    return {
        toggleTheme,
        theme,
    };
};
