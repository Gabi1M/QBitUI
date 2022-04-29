import React from 'react';
import { selectTorrents } from 'meridian/torrent';
import { useSelector } from 'react-redux';
import { selectTorrentFilters } from 'meridian/torrentFilters';
import { getTorrentStateDescription } from 'meridian/models';

const useFilteredTorrents = () => {
    const torrents = useSelector(selectTorrents);
    const torrentFilters = useSelector(selectTorrentFilters);

    return React.useMemo(() => {
        if (!torrents) {
            return undefined;
        }
        let filteredTorrents = torrents;
        if (torrentFilters.name.trim() !== '') {
            filteredTorrents = filteredTorrents.filter(torrent =>
                torrent.name
                    .toLowerCase()
                    .includes(torrentFilters.name.trim().toLowerCase())
            );
        }

        if (torrentFilters.states.length) {
            filteredTorrents = filteredTorrents.filter(torrent =>
                torrentFilters.states.includes(
                    getTorrentStateDescription(torrent.state)
                )
            );
        }

        if (torrentFilters?.categories.length) {
            filteredTorrents = filteredTorrents.filter(torrent =>
                torrentFilters.categories.includes(torrent.category)
            );
        }

        if (torrentFilters?.tags.length) {
            filteredTorrents = filteredTorrents.filter(torrent => {
                const torrentTags = torrent.tags.split(',');
                if (!torrentTags.length) {
                    return false;
                }

                return torrentTags.some(tag =>
                    torrentFilters.tags.includes(tag)
                );
            });
        }

        return filteredTorrents;
    }, [torrents, torrentFilters]);
};

export default useFilteredTorrents;
