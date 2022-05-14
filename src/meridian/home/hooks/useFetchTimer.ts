import React from 'react';
import { useSelector } from 'react-redux';
import { selectSettings } from 'meridian/settings';
import { useRefreshMainData } from 'meridian/mainData';

const useFetchTimer = () => {
    const refreshMainData = useRefreshMainData();
    const settings = useSelector(selectSettings);
    let timer: NodeJS.Timer;

    React.useEffect(() => {
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
