import React from 'react';
import { selectSettings, createSetSettingsAction } from 'meridian/settings';
import { useDispatch, useSelector } from 'react-redux';

export const useToggleTheme = () => {
    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();

    const theme = settings.darkMode ? 'dark' : 'light';
    const toggleTheme = React.useCallback(() => {
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
