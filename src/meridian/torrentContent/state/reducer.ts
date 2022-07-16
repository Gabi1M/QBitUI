import { Resource, createResourceReducer } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.TORRENT_CONTENT);
export { reducer as torrentContentReducer, actions as TorrentContentActions };
