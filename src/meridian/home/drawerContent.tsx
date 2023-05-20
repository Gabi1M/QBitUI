import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import { Box, LoadingOverlay, MultiSelect, Text, Title, createStyles } from '@mantine/core';

import { selectMainData } from 'meridian/mainData';
import { TorrentFilters, TorrentStateDescription } from 'meridian/models';
import { createSetTorrentFiltersAction, selectTorrentFilters } from 'meridian/torrentFilters';
import { TransferInfoCard } from 'meridian/transferInfo';

import { useFilteredTorrents } from './hooks';

const DrawerContent = () => {
    const styles = useStyles();
    const mainData = useSelector(selectMainData);
    const torrents = useFilteredTorrents();
    const torrentFilters = useSelector(selectTorrentFilters);
    const dispatch = useDispatch();

    const onTorrentFilterChanged = useCallback(
        (field: keyof TorrentFilters, value: TorrentFilters[keyof TorrentFilters]) => {
            dispatch(
                createSetTorrentFiltersAction({
                    ...torrentFilters,
                    [field]: value,
                }),
            );
        },
        [dispatch, torrentFilters],
    );

    const handlers = {
        states: (value: string[]) => onTorrentFilterChanged('states', value),
        categories: (value: string[]) => onTorrentFilterChanged('categories', value),
        tags: (value: string[]) => onTorrentFilterChanged('tags', value),
    };

    if (!mainData || !torrents) {
        return <LoadingOverlay visible />;
    }

    const { categories: categoriesData, tags } = mainData;
    const categories = Object.values(categoriesData).map((category) => category.name);
    const text = torrents.length ? `${torrents.length} ${t`Torrents`}` : t`No Torrents`;

    return (
        <>
            <TransferInfoCard />
            <Box className={styles.classes.space}>
                <Text size='xl'>{text}</Text>
            </Box>
            <Title order={4} align='center'>{t`Filters`}</Title>
            <MultiSelect
                label={t`States`}
                placeholder={t`All`}
                value={torrentFilters.states}
                data={Object.values(TorrentStateDescription)}
                onChange={handlers['states']}
            />
            <MultiSelect
                label={t`Categories`}
                placeholder={t`All`}
                value={torrentFilters.categories}
                data={categories}
                onChange={handlers['categories']}
            />
            <MultiSelect
                label={t`Tags`}
                placeholder={t`All`}
                value={torrentFilters.tags}
                data={tags}
                onChange={handlers['tags']}
            />
        </>
    );
};

const useStyles = createStyles({
    space: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DrawerContent;
