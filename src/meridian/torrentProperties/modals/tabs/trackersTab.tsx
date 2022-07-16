import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '@lingui/macro';
import { createStyles, LoadingOverlay, ScrollArea, Table, Tooltip } from '@mantine/core';
import { TorrentTracker, TorrentTrackerStatusDescription } from 'meridian/models';
import { truncateLongText } from 'meridian/utils';
import { selectTorrentTrackers } from 'meridian/torrentTrackers';

const TrackersTab = () => {
    const styles = useStyles();
    const trackers = useSelector(selectTorrentTrackers);
    if (!trackers) {
        return <LoadingOverlay visible />;
    }

    return (
        <ScrollArea className={styles.classes.root} scrollbarSize={2}>
            <Table highlightOnHover striped>
                <thead>
                    <tr>
                        <th>{t`URL`}</th>
                        <th>{t`Status`}</th>
                        <th>{t`Tier`}</th>
                        <th>{t`Peers`}</th>
                        <th>{t`Seeds`}</th>
                        <th>{t`Leeches`}</th>
                        <th>{t`Downloaded`}</th>
                        <th>{t`Message`}</th>
                    </tr>
                </thead>
                <tbody>
                    {trackers.map((tracker) => (
                        <TrackerItem key={tracker.url} tracker={tracker} />
                    ))}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

interface TrackerItemProps {
    tracker: TorrentTracker;
}

const TrackerItem = ({ tracker }: TrackerItemProps) => (
    <tr key={tracker.url}>
        <td>
            <Tooltip wrapLines label={tracker.url}>
                {truncateLongText(tracker.url)}
            </Tooltip>
        </td>
        <td>{TorrentTrackerStatusDescription[tracker.status]}</td>
        <td>{tracker.tier}</td>
        <td>{tracker.num_peers}</td>
        <td>{tracker.num_seeds}</td>
        <td>{tracker.num_leeches}</td>
        <td>{tracker.num_downloaded}</td>
        <td>
            <Tooltip wrapLines label={tracker.msg}>
                {truncateLongText(tracker.msg, 50)}
            </Tooltip>
        </td>
    </tr>
);

const useStyles = createStyles({
    root: {
        height: '50vh',
    },
});

export default TrackersTab;
