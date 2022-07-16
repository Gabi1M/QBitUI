import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import {
    Box,
    LoadingOverlay,
    MultiSelect,
    Text,
    TextInput,
    Title,
    createStyles,
} from '@mantine/core';

import { selectMainData } from 'meridian/mainData';
import { TorrentFilters, TorrentState, TorrentStateDescription } from 'meridian/models';
import { createSetTorrentFiltersAction, selectTorrentFilters } from 'meridian/torrentFilters';
import { TransferInfoCard } from 'meridian/transferInfo';

import { useFilteredTorrents } from './hooks';

const DrawerContent = () => {
    const styles = useStyles();
    const mainData = useSelector(selectMainData);
    const torrents = useFilteredTorrents();
    const torrentFilters = useSelector(selectTorrentFilters);
    const dispatch = useDispatch();

    const onTorrentFilterChanged = React.useCallback(
        (field: keyof TorrentFilters, value: string | string[] | TorrentState[]) => {
            dispatch(
                createSetTorrentFiltersAction({
                    ...torrentFilters,
                    [field]: value,
                }),
            );
        },
        [dispatch, torrentFilters],
    );

    if (!mainData || !torrents) {
        return <LoadingOverlay visible />;
    }

    const { categories } = mainData;
    const { tags } = mainData;

    return (
        <>
            <TransferInfoCard />
            <Box className={styles.classes.space}>
                <Text size='xl'>
                    {torrents?.length ? `${torrents.length} ${t`Torrents`}` : t`No Torrents`}
                </Text>
            </Box>
            <Title order={4} align='center'>{t`Filters`}</Title>
            <TextInput
                label={t`Name`}
                placeholder={t`Enter a name`}
                value={torrentFilters.name}
                onChange={(value) => onTorrentFilterChanged('name', value.target.value)}
            />
            <MultiSelect
                label={t`States`}
                placeholder={t`All`}
                value={torrentFilters.states}
                data={Object.values(TorrentStateDescription)}
                onChange={(value) => onTorrentFilterChanged('states', value)}
            />
            <MultiSelect
                label={t`Categories`}
                placeholder={t`All`}
                value={torrentFilters.categories}
                data={categories ? Object.values(categories).map((x) => x.name) : []}
                onChange={(value) => onTorrentFilterChanged('categories', value)}
            />
            <MultiSelect
                label={t`Tags`}
                placeholder={t`All`}
                value={torrentFilters.tags}
                data={tags ?? []}
                onChange={(value) => onTorrentFilterChanged('tags', value)}
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
