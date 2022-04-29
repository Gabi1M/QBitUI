import { Language } from 'meridian/i18n/types';
import { LocalStorage, LocalStorageKey } from 'meridian/localStorage';
import { Settings, TorrentState } from 'meridian/models';
import { BaseAction } from 'meridian/resource';
import { SettingsActions, SetSettingsAction } from './actions';
import { SettingsState } from './types';

export const defaultSettings: Settings = {
    darkMode: true,
    autoRefresh: true,
    autoRefreshInterval: 2,
    torrentsPerPage: 5,
    language: Language.ENGLISH,
    torrentStateColors: {
        [TorrentState.ALLOCATING]: 'blue',
        [TorrentState.CHECKING_DL]: 'orange',
        [TorrentState.CHECKING_RESUME_DATA]: 'orange',
        [TorrentState.CHECKING_UP]: 'orange',
        [TorrentState.DOWNLOADING]: 'lime',
        [TorrentState.ERROR]: 'red',
        [TorrentState.FORCED_DL]: 'lime',
        [TorrentState.FORCED_UP]: 'indigo',
        [TorrentState.META_DL]: 'lime',
        [TorrentState.MISSING_FILES]: 'red',
        [TorrentState.MOVING]: 'blue',
        [TorrentState.PAUSED_DL]: 'blue',
        [TorrentState.PAUSED_UP]: 'blue',
        [TorrentState.QUEUED_DL]: 'lime',
        [TorrentState.QUEUED_UP]: 'indigo',
        [TorrentState.STALLED_DL]: 'lime',
        [TorrentState.STALLED_UP]: 'indigo',
        [TorrentState.UPLOADING]: 'indigo',
        [TorrentState.UNKNOWN]: 'red',
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
                        successAction.settings.darkMode ||
                        defaultSettings.darkMode,
                    autoRefresh:
                        successAction.settings.autoRefresh ||
                        defaultSettings.autoRefresh,
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
