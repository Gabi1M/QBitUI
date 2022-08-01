import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectMainData } from 'meridian/mainData';
import { getTorrentStateDescription } from 'meridian/models';
import { selectTorrentFilters } from 'meridian/torrentFilters';

const useFilteredTorrents = () => {
    const mainData = useSelector(selectMainData);
    const torrentFilters = useSelector(selectTorrentFilters);

    return useMemo(() => {
        if (!mainData?.torrents) {
            return undefined;
        }
        let filteredTorrents = Object.values(mainData.torrents);
        if (torrentFilters.name.trim() !== '') {
            filteredTorrents = filteredTorrents.filter((torrent) =>
                torrent.name.toLowerCase().includes(torrentFilters.name.trim().toLowerCase()),
            );
        }

        if (torrentFilters.states.length) {
            filteredTorrents = filteredTorrents.filter((torrent) =>
                torrentFilters.states.includes(getTorrentStateDescription(torrent.state)),
            );
        }

        if (torrentFilters?.categories.length) {
            filteredTorrents = filteredTorrents.filter((torrent) =>
                torrentFilters.categories.includes(torrent.category),
            );
        }

        if (torrentFilters?.tags.length) {
            filteredTorrents = filteredTorrents.filter((torrent) => {
                const torrentTags = torrent.tags.split(',');
                if (!torrentTags.length) {
                    return false;
                }

                return torrentTags.some((tag) => torrentFilters.tags.includes(tag));
            });
        }

        return filteredTorrents;
    }, [mainData, torrentFilters]);
};

export default useFilteredTorrents;
