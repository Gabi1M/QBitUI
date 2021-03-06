import { Resource, createResourceReducer } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.TORRENT_PROPERTIES);
export { reducer as torrentPropertiesReducer, actions as TorrentPropertiesActions };
