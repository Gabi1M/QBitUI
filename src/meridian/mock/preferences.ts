import { Preferences } from 'meridian/models';

export const MockPreferences: Preferences = {
    create_subfolder_enabled: true,
    start_paused_enabled: false,
    preallocate_all: false,
    incomplete_files_ext: false,
    save_path: 'some/save/path',
    auto_tmm_enabled: true,
    category_changed_tmm_enabled: true,
    save_path_changed_tmm_enabled: true,
    torrent_changed_tmm_enabled: true,
    temp_path_enabled: true,
    temp_path: 'some/temp/path',
    autorun_enabled: true,
    autorun_program: 'some/autorun/program',
    alternative_webui_enabled: true,
    alternative_webui_path: 'some/webui/path',
    bypass_auth_subnet_whitelist_enabled: true,
    bypass_auth_subnet_whitelist: '1.1.1.1',
    web_ui_username: 'username',
    web_ui_password: 'password',
};
