import { Language } from 'meridian/i18n/types';
import { LocalStorage, LocalStorageKey } from 'meridian/localStorage';
import { BaseAction } from 'meridian/resource';
import { SettingsActions, SetSettingsAction } from './actions';
import { SettingsState } from './types';

const initialState: SettingsState = {
    settings: {
        darkMode: true,
        autoRefresh: true,
        autoRefreshInterval: 2,
        torrentsPerPage: 5,
        language: Language.ENGLISH,
    },
};

export const settingsReducer = (
    state: SettingsState = initialState,
    action: BaseAction
): SettingsState => {
    switch (action.type) {
        case SettingsActions.SET_SETTINGS: {
            const successAction = action as SetSettingsAction;
            LocalStorage.setValue(
                LocalStorageKey.SETTINGS,
                successAction.settings
            );
            return {
                ...state,
                settings: successAction.settings,
            };
        }
        default: {
            return state;
        }
    }
};
