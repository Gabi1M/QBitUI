import React from 'react';
import { TorrentInfo } from 'meridian/models';
import {
    Box,
    Card,
    createStyles,
    Group,
    RingProgress,
    Text,
} from '@mantine/core';
import { t } from '@lingui/macro';
import { bytesToSize, calculateEtaString } from 'meridian/utils';
import {
    ContextMenu,
    LabelWithBadge,
    LabelWithText,
    useWindowSize,
} from 'meridian/generic';
import { StateToStringMapping } from './types';
import useContextMenuItems from './useContextMenuItems';

interface Props {
    torrent: TorrentInfo;
}

const TorrentCard = ({ torrent }: Props) => {
    const styles = useStyles();
    const contextMenuItems = useContextMenuItems(torrent);
    const { width } = useWindowSize();

    const isSmallDevice = width < 450;

    return (
        <Card
            p='sm'
            m='sm'
            withBorder
            radius='md'
            className={styles.classes.root}
        >
            <Box>
                <Text size='xl'>{torrent.name}</Text>
                <Group mt='lg'>
                    <LabelWithBadge
                        label={t`Status`}
                        text={StateToStringMapping[torrent.state].stateText}
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
            <RingProgress
                className={styles.classes.ringProgress}
                roundCaps
                size={isSmallDevice ? 50 : 150}
                thickness={isSmallDevice ? 3 : 7}
                sections={[
                    {
                        value: torrent.progress * 100,
                        color: styles.theme.colors.green[4],
                    },
                ]}
                label={
                    <Text size={isSmallDevice ? 'xs' : 'md'} align='center'>
                        {(torrent.progress * 100).toFixed(0)}%
                    </Text>
                }
            />
        </Card>
    );
};

const useStyles = createStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },
    space: {
        flexGrow: 1,
    },
    ringProgress: {
        alignSelf: 'center',
    },
}));

export default TorrentCard;
