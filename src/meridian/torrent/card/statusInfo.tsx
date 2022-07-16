import React from 'react';
import { Download, Upload } from 'tabler-icons-react';
import { t } from '@lingui/macro';
import { Box, createStyles, Group, MantineStyleSystemProps } from '@mantine/core';
import { LabelWithBadge, LabelWithText } from 'meridian/generic';
import {
    getTorrentStateDescription,
    TorrentState,
    TorrentStateDescriptionCollorMapping,
} from 'meridian/models';
import { bytesToSize } from 'meridian/utils';

interface Props extends MantineStyleSystemProps {
    state: TorrentState;
    category: string;
    tags: string;
    dlSpeed: number;
    upSpeed: number;
}

const StatusInfo = ({ state, category, tags, dlSpeed, upSpeed, ...props }: Props) => {
    const styles = useStyles();
    const torrentStateDescription = getTorrentStateDescription(state);
    return (
        <Box {...props} className={styles.classes.root}>
            <Group>
                <LabelWithBadge
                    label={t`Status`}
                    text={torrentStateDescription}
                    color={TorrentStateDescriptionCollorMapping[torrentStateDescription]}
                />
                {category !== '' ? <LabelWithBadge label={t`Category`} text={category} /> : null}
                {tags !== '' ? <LabelWithBadge label={t`Tags`} text={tags} /> : null}
            </Group>
            <Group className={styles.classes.speeds}>
                <LabelWithText
                    label={t`Download speed`}
                    text={bytesToSize(dlSpeed)}
                    color={styles.theme.colors.green[7]}
                    icon={<Download color={styles.theme.colors.green[7]} />}
                />
                <LabelWithText
                    label={t`Upload speed`}
                    text={bytesToSize(upSpeed)}
                    color={styles.theme.colors.cyan[4]}
                    icon={<Upload color={styles.theme.colors.cyan[4]} />}
                />
            </Group>
        </Box>
    );
};

const useStyles = createStyles({
    root: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    speeds: {
        justifyContent: 'flex-end',
    },
});

export default React.memo(StatusInfo);
