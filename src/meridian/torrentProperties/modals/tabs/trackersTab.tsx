import React from 'react';
import { useSelector } from 'react-redux';

import { t } from '@lingui/macro';
import { User, Users } from 'tabler-icons-react';

import { Badge, Box, LoadingOverlay, ScrollArea, Text, Tooltip, createStyles } from '@mantine/core';

import { TorrentTracker, TorrentTrackerStatusDescription } from 'meridian/models';
import { selectTorrentTrackers } from 'meridian/torrentTrackers';

const TrackersTab = () => {
    const styles = useStyles();
    const trackers = useSelector(selectTorrentTrackers);
    if (!trackers) {
        return <LoadingOverlay visible />;
    }

    return (
        <ScrollArea className={styles.classes.scroll}>
            {trackers.map((tracker) => (
                <TrackerItem key={tracker.url} tracker={tracker} />
            ))}
        </ScrollArea>
    );
};

interface TrackerItemProps {
    tracker: TorrentTracker;
}

const TrackerItem = ({ tracker }: TrackerItemProps) => {
    const styles = useStyles();

    return (
        <Box className={styles.classes.item}>
            <Tooltip label={tracker.url} multiline>
                <Text lineClamp={1}>{tracker.url}</Text>
            </Tooltip>
            <Box className={styles.classes.container}>
                <Tooltip label={t`Peers`}>
                    <Box className={styles.classes.dataIcon}>
                        <Text size='sm'>{tracker.num_peers}</Text>
                        <Users size={14} color={styles.theme.colors.blue[8]} />
                    </Box>
                </Tooltip>
                <Tooltip label={t`Seeds`}>
                    <Box className={styles.classes.dataIcon}>
                        <Text size='sm'>{tracker.num_seeds}</Text>
                        <User size={14} color={styles.theme.colors.green[5]} />
                    </Box>
                </Tooltip>
                <Tooltip label={`Leeches`}>
                    <Box className={styles.classes.dataIcon}>
                        <Text size='sm'>{tracker.num_leeches}</Text>
                        <User size={14} color={styles.theme.colors.red[5]} />
                    </Box>
                </Tooltip>
                <Tooltip label={t`Status`}>
                    <Badge>{TorrentTrackerStatusDescription[tracker.status]}</Badge>
                </Tooltip>
            </Box>
        </Box>
    );
};

const useStyles = createStyles((theme) => ({
    scroll: {
        height: '50vh',
    },
    item: {
        marginBlock: 10,
        padding: 5,
        alignItems: 'center',
        backgroundColor: theme.colors.dark[6],
        borderRadius: theme.radius.md,
    },
    dataIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export default TrackersTab;
