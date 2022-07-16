import React from 'react';
import { useSelector } from 'react-redux';
import { Box, createStyles, Pagination } from '@mantine/core';
import { TorrentCard } from 'meridian/torrent';
import { TorrentInfo } from 'meridian/models';
import { ScrollToTopAffix, DrawerPage } from 'meridian/generic';
import { selectSettings } from 'meridian/settings';
import DrawerContent from './drawerContent';
import HeaderContent from './headerContent';
import SelectionAffix from './selectionAffix';
import { useFilteredTorrents, useManageSelection, usePagination, useFetchTimer } from './hooks';

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
                        torrent={torrent as TorrentInfo}
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
