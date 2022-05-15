import { Resource, ResourceState } from 'meridian/resource';
import { SessionState } from 'meridian/session/state/types';
import { SettingsState } from 'meridian/settings/state/types';
import { TorrentFiltersState } from 'meridian/torrentFilters/state/types';

export interface GlobalState {
    mainDataState: ResourceState<Resource.MAIN_DATA>;
    torrentState: ResourceState<Resource.TORRENT>;
    torrentPropertiesState: ResourceState<Resource.TORRENT_PROPERTIES>;
    torrentContentState: ResourceState<Resource.TORRENT_CONTENT>;
    torrentFiltersState: TorrentFiltersState;
    sessionState: SessionState;
    settingsState: SettingsState;
    transferInfoState: ResourceState<Resource.TRANSFER_INFO>;
    preferencesState: ResourceState<Resource.PREFERENCES>;
    categoriesState: ResourceState<Resource.CATEGORIES>;
    tagsState: ResourceState<Resource.TAGS>;
}
