import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preferences } from 'meridian/models';
import { selectPreferences } from 'meridian/preferences';
import { Resource, createResourceSetAction } from 'meridian/resource';

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

    const onSave = React.useCallback(() => {
        if (preferences) {
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
        onSave,
    };
};

export default usePreferences;
