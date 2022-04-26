import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preferences } from 'meridian/models';
import { Resource, createResourceSetAction } from 'meridian/resource';
import { selectPreferences } from '../state';

const usePreferences = () => {
    const selectedPreferences = useSelector(selectPreferences);
    const dispatch = useDispatch();

    const [preferences, setPreferences] = React.useState(selectedPreferences);
    const [changedPreferences, setChangedPreferences] =
        React.useState<Preferences>({});

    const updatePreferencesKey = (
        name: keyof Preferences,
        value: string | boolean | number | string[]
    ) => {
        setChangedPreferences(prev => ({
            ...prev,
            [name]: value,
        }));
        setPreferences(prev => ({ ...prev, [name]: value }));
    };

    const updateBulkPreferencesKey = (
        items: {
            name: keyof Preferences;
            value: string | boolean | number | string[];
        }[]
    ) => {
        setChangedPreferences(prev =>
            items.reduce(
                (acc, current) => ({ ...acc, [current.name]: current.value }),
                prev
            )
        );
        setPreferences(prev =>
            items.reduce(
                (acc, current) => ({ ...acc, [current.name]: current.value }),
                prev
            )
        );
    };

    const onSave = React.useCallback(() => {
        if (preferences) {
            if (changedPreferences.web_ui_password === '') {
                changedPreferences.web_ui_password = undefined;
            }

            if (changedPreferences.proxy_password === '') {
                changedPreferences.proxy_password = undefined;
            }

            dispatch(
                createResourceSetAction(
                    Resource.PREFERENCES,
                    changedPreferences
                )
            );
            setChangedPreferences({});
        }
    }, [preferences, changedPreferences, dispatch]);

    React.useEffect(() => {
        setPreferences(selectedPreferences);
    }, [selectedPreferences]);

    return {
        preferences,
        updatePreferencesKey,
        updateBulkPreferencesKey,
        onSave,
    };
};

export default usePreferences;
