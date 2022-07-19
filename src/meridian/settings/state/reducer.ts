import { Language } from 'meridian/i18n/types';
import { LocalStorage, LocalStorageKey } from 'meridian/localStorage';
import { Settings } from 'meridian/models';
import { BaseAction } from 'meridian/resource';

import { SetSettingsAction, SettingsActions } from './actions';
import { SettingsState } from './types';

export const defaultSettings: Settings = {
    darkMode: true,
    autoRefresh: true,
    autoRefreshInterval: 5,
    torrentsPerPage: 5,
    language: Language.ENGLISH,
};

const initialState: SettingsState = {
    settings: defaultSettings,
};

export const settingsReducer = (
    state: SettingsState = initialState,
    action: BaseAction,
): SettingsState => {
    switch (action.type) {
        case SettingsActions.SET_SETTINGS: {
            const successAction = action as SetSettingsAction;
            LocalStorage.setValue(LocalStorageKey.SETTINGS, successAction.settings);
            return {
                ...state,
                settings: {
                    darkMode:
                        successAction.settings.darkMode !== undefined
                            ? successAction.settings.darkMode
                            : defaultSettings.darkMode,
                    autoRefresh:
                        successAction.settings.autoRefresh !== undefined
                            ? successAction.settings.autoRefresh
                            : defaultSettings.autoRefresh,
                    autoRefreshInterval:
                        successAction.settings.autoRefreshInterval ||
                        defaultSettings.autoRefreshInterval,
                    torrentsPerPage:
                        successAction.settings.torrentsPerPage || defaultSettings.torrentsPerPage,
                    language: successAction.settings.language || defaultSettings.language,
                },
            };
        }
        default: {
            return state;
        }
    }
};
