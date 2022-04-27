import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preferences } from 'meridian/models';
import { Resource, createResourceSetAction } from 'meridian/resource';
import { selectPreferences } from '../state';

interface PreferencesModalState {
    current: Preferences | undefined;
    changed: Preferences;
}

const usePreferences = () => {
    const selectedPreferences = useSelector(selectPreferences);
    const dispatch = useDispatch();

    const [preferencesState, setPreferencesState] =
        React.useState<PreferencesModalState>({
            current: selectedPreferences,
            changed: {},
        });

    const updatePreferencesKey = (
        name: keyof Preferences,
        value: string | boolean | number | string[]
    ) => {
        setPreferencesState(prev => ({
            current: { ...prev.current, [name]: value },
            changed: { ...prev.changed, [name]: value },
        }));
    };

    const updateBulkPreferencesKey = (
        items: {
            name: keyof Preferences;
            value: string | boolean | number | string[];
        }[]
    ) => {
        setPreferencesState(prev => ({
            current: items.reduce(
                (acc, curr) => ({ ...acc, [curr.name]: curr.value }),
                prev.current
            ),
            changed: items.reduce(
                (acc, curr) => ({ ...acc, [curr.name]: curr.value }),
                prev.changed
            ),
        }));
    };

    const onSave = React.useCallback(() => {
        if (preferencesState.current) {
            if (preferencesState.changed.web_ui_password?.trim() === '') {
                preferencesState.changed.web_ui_password = undefined;
            }

            if (preferencesState.changed.proxy_password?.trim() === '') {
                preferencesState.changed.proxy_password = undefined;
            }

            if (
                preferencesState.changed.mail_notification_password?.trim() ===
                ''
            ) {
                preferencesState.changed.mail_notification_password = undefined;
            }

            dispatch(
                createResourceSetAction(
                    Resource.PREFERENCES,
                    preferencesState.changed
                )
            );
            setPreferencesState(prev => ({
                ...prev,
                changed: {},
            }));
        }
    }, [preferencesState, dispatch]);

    React.useEffect(() => {
        setPreferencesState(prev => ({
            ...prev,
            current: selectedPreferences,
        }));
    }, [selectedPreferences]);

    const preferences = preferencesState.current;

    return {
        preferences,
        updatePreferencesKey,
        updateBulkPreferencesKey,
        onSave,
    };
};

export default usePreferences;
