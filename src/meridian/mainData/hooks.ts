import { useFetchResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';

export const useRefreshMainData = () => useFetchResource(Resource.MAIN_DATA);
