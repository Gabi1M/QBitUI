import { Resource, createResourceReducer } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.PREFERENCES);
export { reducer as preferencesReducer, actions as PreferencesActions };
