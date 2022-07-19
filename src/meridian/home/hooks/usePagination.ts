import React from 'react';
import { useSelector } from 'react-redux';

import { selectSettings } from 'meridian/settings';
import { selectTorrentFilters } from 'meridian/torrentFilters';

type PaginationResult<T> = {
    numberOfPages: number;
    currentItems: T[];
    page: number;
    setPage: (page: number) => void;
};

const usePagination = <T>(items: T[] | undefined, itemsPerPage: number): PaginationResult<T> => {
    const [page, setPage] = React.useState(1);
    const torrentFilters = useSelector(selectTorrentFilters);
    const settings = useSelector(selectSettings);

    React.useEffect(() => {
        setPage(1);
    }, [torrentFilters, settings.torrentsPerPage]);

    if (!items) {
        return {
            numberOfPages: 0,
            currentItems: [],
            page,
            setPage,
        };
    }

    const numberOfPages =
        Math.floor(items.length / itemsPerPage) + (items.length % itemsPerPage === 0 ? 0 : 1);
    const currentItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return {
        numberOfPages,
        currentItems,
        page,
        setPage,
    };
};

export default usePagination;
