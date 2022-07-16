import React from 'react';
import { useSelector } from 'react-redux';
import { selectSettings } from 'meridian/settings';
import { useRefreshMainData } from 'meridian/mainData';

const useFetchTimer = () => {
    const refreshMainData = useRefreshMainData();
    const settings = useSelector(selectSettings);

    React.useEffect(() => {
        let timer: NodeJS.Timer;
        refreshMainData();
        if (settings.autoRefresh) {
            timer = setInterval(() => {
                refreshMainData();
            }, settings.autoRefreshInterval * 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [refreshMainData, settings.autoRefresh, settings.autoRefreshInterval]);
};

export default useFetchTimer;
