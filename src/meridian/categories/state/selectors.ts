/* eslint-disable-next-line no-restricted-imports */
import { GlobalState } from 'meridian/state/types';

export const selectCategories = (state: GlobalState) => state.categoriesState.fetch.data;
