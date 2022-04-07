import { createResourceReducer, Resource } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.CATEGORIES);
export { reducer as categoriesReducer, actions as CategoriesActions };
