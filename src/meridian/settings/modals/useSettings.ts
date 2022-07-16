import React from 'react';
import { Settings, TorrentStateDescription } from 'meridian/models';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultMantineColor } from '@mantine/core';
import { selectSettings, createSetSettingsAction } from '../state';

const useSettings = () => {
    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();

    const handleSettingsChange = React.useCallback(
        (
            key: keyof Settings,
            value: boolean | number | string | Record<TorrentStateDescription, DefaultMantineColor>,
        ) => {
            dispatch(createSetSettingsAction({ ...settings, [key]: value }));
        },
        [dispatch, settings],
    );

    return {
        settings,
        handleSettingsChange,
    };
};

export default useSettings;
