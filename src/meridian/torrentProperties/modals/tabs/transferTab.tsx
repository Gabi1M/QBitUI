import React, { memo } from 'react';

import { t } from '@lingui/macro';

import { Box, ScrollArea, createStyles } from '@mantine/core';

import { LabelWithText } from 'meridian/generic';
import { TorrentProperties } from 'meridian/models';
import { bytesToSize } from 'meridian/utils';

type Props = Pick<
    TorrentProperties,
    | 'total_downloaded'
    | 'total_uploaded'
    | 'total_downloaded_session'
    | 'total_uploaded_session'
    | 'peers'
    | 'seeds'
    | 'peers_total'
    | 'seeds_total'
    | 'up_speed_avg'
    | 'dl_speed_avg'
>;

const TransferTab = (props: Props) => {
    const styles = useStyles();
    const leftItems = {
        [t`Average download speed`]: bytesToSize(props.dl_speed_avg),
        [t`Downloaded ( alltime )`]: bytesToSize(props.total_downloaded),
        [t`Downloaded ( session )`]: bytesToSize(props.total_downloaded_session),
        [t`Peers`]: props.peers.toString(),
        [t`Peers ( total )`]: props.peers_total.toString(),
    };
    const rightItems = {
        [t`Average upload speed`]: bytesToSize(props.up_speed_avg),
        [t`Uploaded ( alltime )`]: bytesToSize(props.total_uploaded),
        [t`Uploaded ( session )`]: bytesToSize(props.total_uploaded_session),
        [t`Seeds`]: props.seeds.toString(),
        [t`Seeds ( total )`]: props.seeds_total.toString(),
    };

    return (
        <ScrollArea className={styles.classes.scroll}>
            <Box className={styles.classes.root}>
                <Box>
                    {Object.entries(leftItems).map(([label, text], index) => (
                        <LabelWithText key={index} my='sm' label={label} text={text} />
                    ))}
                </Box>
                <Box className={styles.classes.space} />
                <Box>
                    {Object.entries(rightItems).map(([label, text], index) => (
                        <LabelWithText key={index} my='sm' label={label} text={text} />
                    ))}
                </Box>
            </Box>
        </ScrollArea>
    );
};

const useStyles = createStyles({
    scroll: {
        height: '50vh',
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    space: {
        flex: 1,
    },
});

export default memo(TransferTab);
