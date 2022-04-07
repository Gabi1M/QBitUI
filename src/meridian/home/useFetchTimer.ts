import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';
import { selectSettings } from 'meridian/settings';

const useFetchTimer = () => {
    const fetchTorrents = useFetchResource(Resource.TORRENT);
    const fetchTransferInfo = useFetchResource(Resource.TRANSFER_INFO);
    const settings = useSelector(selectSettings);
    let timer: NodeJS.Timer;

    React.useEffect(() => {
        fetchTorrents();
        fetchTransferInfo();
        if (settings.autoRefresh) {
            timer = setInterval(() => {
                fetchTorrents();
                fetchTransferInfo();
            }, settings.autoRefreshInterval * 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [fetchTorrents, settings.autoRefresh, settings.autoRefreshInterval]);
};

export default useFetchTimer;
