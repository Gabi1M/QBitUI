import { Resource, createResourceReducer } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.CATEGORIES);
export { reducer as categoriesReducer, actions as CategoriesActions };
