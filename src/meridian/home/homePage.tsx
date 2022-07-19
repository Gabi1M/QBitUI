import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Pagination, createStyles } from '@mantine/core';

import { DrawerPage, ScrollToTopAffix } from 'meridian/generic';
import { selectSettings } from 'meridian/settings';
import { TorrentCard } from 'meridian/torrent';

import DrawerContent from './drawerContent';
import HeaderContent from './headerContent';
import { useFetchTimer, useFilteredTorrents, useManageSelection, usePagination } from './hooks';
import SelectionAffix from './selectionAffix';

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
        <DrawerPage headerRightContent={<HeaderContent />} drawerContent={<DrawerContent />}>
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
            {numberOfPages > 1 ? (
                <Pagination
                    className={styles.classes.pagination}
                    mb={10}
                    onChange={setPage}
                    page={page}
                    total={numberOfPages}
                />
            ) : null}
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
