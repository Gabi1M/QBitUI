import React from 'react';
import { Box, Card, createStyles, Group, Text } from '@mantine/core';
import { t } from '@lingui/macro';
import {
    getTorrentStateDescription,
    TorrentInfo,
    TorrentStateDescriptionCollorMapping,
} from 'meridian/models';
import {
    bytesToSize,
    calculateEtaString,
    truncateLongText,
} from 'meridian/utils';
import {
    ContextMenu,
    LabelWithBadge,
    LabelWithText,
    useWindowSize,
} from 'meridian/generic';
import useContextMenuItems from './useContextMenuItems';
import ProgressIndicator from './progressIndicator';

interface Props {
    torrent: TorrentInfo;
    selectable: boolean;
    selected: boolean;
    onSelectionChanged?: (hash: string, selected: boolean) => void;
}

const TorrentCard = ({
    torrent,
    selectable,
    selected,
    onSelectionChanged,
}: Props) => {
    const styles = useStyles(selectable, selected);
    const contextMenuItems = useContextMenuItems(torrent);
    const { width } = useWindowSize();
    const torrentStateDescription = React.useMemo(
        () => getTorrentStateDescription(torrent.state),
        [torrent.state]
    );

    const isSmallDevice = width < 450;

    const toggleSelection = () => onSelectionChanged?.(torrent.hash, !selected);

    return (
        <Card
            p='sm'
            m='sm'
            withBorder
            radius='md'
            className={styles.classes.root}
            onClick={selectable ? toggleSelection : undefined}
        >
            <Box>
                <Text size='xl'>
                    {isSmallDevice
                        ? truncateLongText(torrent.name)
                        : torrent.name}
                </Text>
                <Group mt='lg'>
                    <LabelWithBadge
                        label={t`Status`}
                        text={torrentStateDescription}
                        color={
                            TorrentStateDescriptionCollorMapping[
                                torrentStateDescription
                            ]
                        }
                    />
                </Group>
                <Group mt='lg'>
                    <LabelWithText
                        label={t`Save path`}
                        text={torrent.save_path}
                    />
                    <LabelWithText
                        label={t`Size`}
                        text={bytesToSize(torrent.size)}
                    />
                    <LabelWithText
                        label={t`Seeders`}
                        text={torrent.num_seeds.toString()}
                    />
                    <LabelWithText
                        label={t`Leechers`}
                        text={torrent.num_leechs.toString()}
                    />
                    <LabelWithText
                        label={t`Ratio`}
                        text={torrent.ratio.toFixed(2)}
                    />
                </Group>
                <Group mt='lg'>
                    <LabelWithText
                        label={t`Download speed`}
                        text={bytesToSize(torrent.dlspeed)}
                    />
                    <LabelWithText
                        label={t`Upload speed`}
                        text={bytesToSize(torrent.upspeed)}
                    />
                    {torrent.progress !== 1 ? (
                        <LabelWithText
                            label={t`Remaining time`}
                            text={calculateEtaString(torrent.eta)}
                        />
                    ) : null}
                </Group>
                {torrent.category !== '' || torrent.tags !== '' ? (
                    <Group mt='lg'>
                        {torrent.category !== '' ? (
                            <LabelWithBadge
                                label={t`Category`}
                                text={torrent.category}
                            />
                        ) : null}
                        {torrent.tags !== '' ? (
                            <LabelWithBadge
                                label={t`Tags`}
                                text={torrent.tags}
                            />
                        ) : null}
                    </Group>
                ) : null}
                <Box mt='md'>
                    <ContextMenu items={contextMenuItems} />
                </Box>
            </Box>
            <Box className={styles.classes.space} />
            <ProgressIndicator progress={torrent.progress * 100} />
        </Card>
    );
};

const useStyles = (selectable: boolean, selected: boolean) =>
    createStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'row',
            borderLeftColor:
                selectable && selected ? theme.colors.blue : undefined,
            borderLeftWidth: 10,
            cursor: selectable ? 'pointer' : 'default',
        },
        space: {
            flexGrow: 1,
        },
    }))();

export default TorrentCard;
