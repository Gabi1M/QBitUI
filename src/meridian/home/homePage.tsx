import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import { Box, Pagination, TextInput, createStyles } from '@mantine/core';

import { DrawerPage, ScrollToTopAffix } from 'meridian/generic';
import { selectSettings } from 'meridian/settings';
import { TorrentCard } from 'meridian/torrent';
import { createSetTorrentFiltersAction, selectTorrentFilters } from 'meridian/torrentFilters';

import DrawerContent from './drawerContent';
import HeaderContent from './headerContent';
import { useFetchTimer, useFilteredTorrents, useManageSelection, usePagination } from './hooks';
import SelectionAffix from './selectionAffix';

const PaginationContainer = ({
    numberOfPages,
    page,
    setPage,
}: {
    numberOfPages: number;
    page: number;
    setPage: (page: number) => void;
}) => {
    const styles = useStyles();

    if (!numberOfPages) {
        return null;
    }

    return (
        <Pagination
            className={styles.classes.pagination}
            mb={10}
            onChange={setPage}
            page={page}
            total={numberOfPages}
        />
    );
};

const HeaderLeftContent = () => {
    const dispatch = useDispatch();
    const torrentFilters = useSelector(selectTorrentFilters);

    const onNameChanged = useCallback(
        (value: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                createSetTorrentFiltersAction({
                    ...torrentFilters,
                    name: value.target.value,
                }),
            );
        },
        [dispatch, torrentFilters],
    );

    return (
        <Box>
            <TextInput
                ml='xl'
                placeholder={t`Enter a name`}
                value={torrentFilters.name}
                onChange={onNameChanged}
            />
        </Box>
    );
};

const HomePage = () => {
    const styles = useStyles();
    const torrents = useFilteredTorrents();
    const settings = useSelector(selectSettings);
    const { page, setPage, currentItems, numberOfPages } = usePagination(
        torrents,
        settings.torrentsPerPage,
    );
    useFetchTimer();

    const { selectionEnabled, setSelectionEnabled, keys, onSelectionChanged, clearSelection } =
        useManageSelection();

    return (
        <DrawerPage
            headerLeftContent={<HeaderLeftContent />}
            headerRightContent={<HeaderContent />}
            drawerContent={<DrawerContent />}
        >
            <Box className={styles.classes.root}>
                {currentItems.map((torrent) => (
                    <TorrentCard
                        key={torrent.hash}
                        torrent={torrent}
                        selectable={selectionEnabled}
                        selected={keys.includes(torrent.hash)}
                        onSelectionChanged={onSelectionChanged}
                    />
                ))}
            </Box>
            <PaginationContainer numberOfPages={numberOfPages} page={page} setPage={setPage} />
            <ScrollToTopAffix />
            <SelectionAffix
                hashes={keys}
                selectionEnabled={selectionEnabled}
                setSelectionEnabled={setSelectionEnabled}
                clearSelection={clearSelection}
            />
        </DrawerPage>
    );
};

const useStyles = createStyles({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    pagination: {
        alignSelf: 'center',
    },
});

export default HomePage;
