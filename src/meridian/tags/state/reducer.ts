import { Resource, createResourceReducer } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.TAGS);
export { reducer as tagsReducer, actions as TagsActions };
