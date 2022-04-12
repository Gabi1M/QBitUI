import React from 'react';
import { useSelector } from 'react-redux';
import { BoxMultiple, Edit, Plus, Settings, Tag } from 'tabler-icons-react';
import { ActionIcon, Box, createStyles, Pagination } from '@mantine/core';
import { t } from '@lingui/macro';
import { TorrentCard, useAddTorrentsModal } from 'meridian/torrent';
import { TorrentInfo } from 'meridian/models';
import { ContextMenu, ContextMenuItem, DrawerPage } from 'meridian/generic';
import { selectSettings, useSettingsModal } from 'meridian/settings';
import { usePreferencesModal } from 'meridian/preferences';
import { useCategoriesModal } from 'meridian/categories';
import { useTagsModal } from 'meridian/tags';
import useFetchTimer from './useFetchTimer';
import useFilteredTorrents from './useFilteredTorrents';
import usePagination from './usePagination';
import DrawerContent from './drawerContent';

const HeaderRightContent = () => {
    const openAddTorrentsModal = useAddTorrentsModal();
    const openSettingsModal = useSettingsModal();
    const openPreferencesModal = usePreferencesModal();
    const openCategoriesModal = useCategoriesModal();
    const openTagsModal = useTagsModal();
    const items: ContextMenuItem[] = [
        {
            text: t`WebUI Settings`,
            icon: <Settings />,
            callback: openSettingsModal,
        },
        {
            text: t`Preferences`,
            icon: <Edit />,
            callback: openPreferencesModal,
        },
        {
            text: t`Categories`,
            icon: <BoxMultiple />,
            callback: openCategoriesModal,
        },
        {
            text: t`Tags`,
            icon: <Tag />,
            callback: openTagsModal,
        },
    ];
    return (
        <>
            <ActionIcon m='sm' onClick={openAddTorrentsModal}>
                <Plus />
            </ActionIcon>
            <ContextMenu
                items={items}
                control={
                    <ActionIcon>
                        <Settings />
                    </ActionIcon>
                }
            />
        </>
    );
};

const HomePage = () => {
    const styles = useStyles();
    const torrents = useFilteredTorrents();
    const settings = useSelector(selectSettings);
    const { page, setPage, currentItems, numberOfPages } = usePagination(
        torrents,
        settings.torrentsPerPage
    );
    useFetchTimer();

    return (
        <DrawerPage
            headerRightContent={<HeaderRightContent />}
            drawerContent={<DrawerContent />}
        >
            <Box className={styles.classes.root}>
                {currentItems.map(torrent => (
                    <TorrentCard
                        key={torrent.hash}
                        torrent={torrent as TorrentInfo}
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
