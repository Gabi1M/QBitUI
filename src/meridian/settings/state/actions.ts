import { Settings } from 'meridian/models';
import { BaseAction } from 'meridian/resource';

export enum SettingsActions {
    SET_SETTINGS = 'SET_SETTINGS',
}

export interface SetSettingsAction extends BaseAction {
    settings: Settings;
}
export const createSetSettingsAction = (settings: Settings): SetSettingsAction => ({
    type: SettingsActions.SET_SETTINGS,
    settings,
});
