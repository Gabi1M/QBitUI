import React from 'react';
import { Settings } from 'meridian/models';
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, createSetSettingsAction } from '../state';

const useSettings = () => {
    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();

    const handleSettingsChange = React.useCallback(
        (key: keyof Settings, value: boolean | number | string) => {
            dispatch(createSetSettingsAction({ ...settings, [key]: value }));
        },
        [dispatch, settings]
    );

    return {
        settings,
        handleSettingsChange,
    };
};

export default useSettings;
