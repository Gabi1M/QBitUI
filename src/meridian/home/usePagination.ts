import React from 'react';

type PaginationResult <T extends unknown> = {
    numberOfPages: number,
    currentItems: T[],
    page: number,
    setPage: (page: number) => void
}

const usePagination = <T extends unknown> (items: T[] | undefined, itemsPerPage: number): PaginationResult<T> => {
    const [page, setPage] = React.useState(1);

    if(!items) {
        return {
            numberOfPages: 0,
            currentItems: [],
            page,
            setPage
        }
    }

    const numberOfPages = Math.floor(items.length / itemsPerPage) + 1;
    const currentItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return {
        numberOfPages,
        currentItems,
        page,
        setPage
    }
};

export default usePagination;