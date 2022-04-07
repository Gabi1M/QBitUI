import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, MultiSelect, TextInput, Title, Text, createStyles } from '@mantine/core';
import { t } from '@lingui/macro';
import { TorrentFilters, TorrentState } from 'meridian/models';
import { createSetTorrentFiltersAction, selectTorrentFilters } from 'meridian/torrentFilters';
import { selectTorrents } from 'meridian/torrent';
import { selectCategories } from 'meridian/categories';
import { selectTags } from 'meridian/tags';
import { removeDuplicatesFromArray } from 'meridian/utils';
import { TransferInfoCard } from 'meridian/transferInfo';
import { StateGrouping, TorrentStateDescription } from 'meridian/torrent/types';

const DrawerContent = () => {
    const styles = useStyles();
    const torrents = useSelector(selectTorrents);
    const torrentFilters = useSelector(selectTorrentFilters);
    const categories = useSelector(selectCategories);
    const tags = useSelector(selectTags);
    const dispatch = useDispatch();

    const onTorrentFilterChanged = React.useCallback((field: keyof TorrentFilters, value: string | string[] | TorrentState[]) => {
        dispatch(createSetTorrentFiltersAction({
            ...torrentFilters,
            [field]: value
        }))
    }, [dispatch, torrentFilters]);

    const onStateFilterChanged = React.useCallback(
        (value: TorrentStateDescription[]) => {
            const states = removeDuplicatesFromArray(
                value.reduce((acc, current) => {
                    StateGrouping[current].forEach(item => acc.push(item));
                    return acc;
                }, [] as TorrentState[])
            );
            dispatch(
                createSetTorrentFiltersAction({ ...torrentFilters, states })
            );
        },
        [dispatch, torrentFilters]
    );

    const torrentStateDescriptions = React.useMemo(
        () =>
            removeDuplicatesFromArray(
                Object.entries(StateGrouping).reduce((acc, current) => {
                    current[1].forEach(item => {
                        if (torrentFilters.states.includes(item)) {
                            acc.push(current[0] as TorrentStateDescription);
                        }
                    });
                    return acc;
                }, [] as TorrentStateDescription[])
            ),
        [torrentFilters.states]
    );

    return (
        <>
            <TransferInfoCard />
            <Box className={styles.classes.space}>
                <Text size='xl'>{torrents?.length ? `${torrents.length} ${t`Torrents`}` : t`No Torrents`}</Text>
            </Box>
            <Title order={4} align='center'>{t`Filters`}</Title>
            <TextInput label={t`Name`} placeholder={t`Enter a name`} value={torrentFilters.name} onChange={value => onTorrentFilterChanged('name', value.target.value)} />
            <MultiSelect label={t`States`} placeholder={t`All`} value={torrentStateDescriptions} data={Object.values(TorrentStateDescription)} onChange={onStateFilterChanged} />
            <MultiSelect label={t`Categories`} placeholder={t`All`} value={torrentFilters.categories} data={categories ? Object.values(categories).map(x => x.name) : []} onChange={value => onTorrentFilterChanged('categories', value)} />
            <MultiSelect label={t`Tags`} placeholder={t`All`} value={torrentFilters.tags} data={tags ?? []} onChange={value => onTorrentFilterChanged('tags', value)} />
        </>
    )
};

const useStyles = createStyles({
    space: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default DrawerContent;