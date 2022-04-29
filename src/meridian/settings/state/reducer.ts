import { Language } from 'meridian/i18n/types';
import { LocalStorage, LocalStorageKey } from 'meridian/localStorage';
import { Settings, TorrentStateDescription } from 'meridian/models';
import { BaseAction } from 'meridian/resource';
import { SettingsActions, SetSettingsAction } from './actions';
import { SettingsState } from './types';

export const defaultSettings: Settings = {
    darkMode: true,
    autoRefresh: true,
    autoRefreshInterval: 5,
    torrentsPerPage: 5,
    language: Language.ENGLISH,
    torrentStateColors: {
        [TorrentStateDescription.DOWNLOADING]: '#1d4f11',
        [TorrentStateDescription.UPLOADING]: '#4d2044',
        [TorrentStateDescription.CHECKING]: '#db3c14',
        [TorrentStateDescription.ERROR]: '#731931',
        [TorrentStateDescription.MISSING_FILES]: '#731931',
        [TorrentStateDescription.ALLOCATING]: '#193f73',
        [TorrentStateDescription.MOVING]: '#193f73',
        [TorrentStateDescription.PAUSED]: '#193f73',
        [TorrentStateDescription.QUEUED]: '#193f73',
        [TorrentStateDescription.RESUMING]: '#193f73',
        [TorrentStateDescription.UNKNOWN]: '#193f73',
    },
};

const initialState: SettingsState = {
    settings: defaultSettings,
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
                        successAction.settings.torrentsPerPage ||
                        defaultSettings.torrentsPerPage,
                    language:
                        successAction.settings.language ||
                        defaultSettings.language,
                    torrentStateColors:
                        successAction.settings.torrentStateColors ||
                        defaultSettings.torrentStateColors,
                },
            };
        }
        default: {
            return state;
        }
    }
};
