import { createResourceReducer, Resource } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.TORRENT_TRACKERS);
export { reducer as torrentTrackersReducer, actions as TorrentTrackersActions };
