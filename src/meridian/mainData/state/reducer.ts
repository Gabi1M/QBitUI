import { Resource, createResourceReducer } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.MAIN_DATA);
export { reducer as mainDataReducer, actions as MainDataActions };
