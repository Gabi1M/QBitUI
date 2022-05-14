import React from 'react';
import { useFetchResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';
import { useSelector } from 'react-redux';
import { selectMainData } from './state';

export const useRefreshMainData = () => {
    const currentMainData = useSelector(selectMainData);
    const fetchMainData = useFetchResource(Resource.MAIN_DATA);

    return React.useCallback(
        () => fetchMainData({ rid: currentMainData?.rid }),
        [currentMainData?.rid, fetchMainData]
    );
};
