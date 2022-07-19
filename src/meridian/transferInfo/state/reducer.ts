import { Resource, createResourceReducer } from 'meridian/resource';

const { reducer, actions } = createResourceReducer(Resource.TRANSFER_INFO);
export { reducer as transferInfoReducer, actions as TransferInfoActions };
