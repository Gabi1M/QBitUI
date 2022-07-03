import React from 'react';
import { Box, createStyles, MantineStyleSystemProps } from '@mantine/core';
import { ContextMenu, ResponsiveText } from 'meridian/generic';
import { TorrentInfo } from 'meridian/models';
import useContextMenuItems from '../useContextMenuItems';

interface Props extends MantineStyleSystemProps {
    torrent: TorrentInfo;
}

const TitleAndMenu = ({ torrent, ...props }: Props) => {
    const styles = useStyles();
    const contextMenuItems = useContextMenuItems(torrent);

    return (
        <Box {...props} className={styles.classes.root}>
            <ResponsiveText size='xl'>{torrent.name}</ResponsiveText>
            <ContextMenu ml='xs' items={contextMenuItems} />
        </Box>
    );
};

const useStyles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default TitleAndMenu;
