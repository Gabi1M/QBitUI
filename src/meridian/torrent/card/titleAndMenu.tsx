import React from 'react';

import { Box, MantineStyleSystemProps, createStyles } from '@mantine/core';

import { ContextMenu, ResponsiveText } from 'meridian/generic';

import useContextMenuItems from '../useContextMenuItems';

interface Props extends MantineStyleSystemProps {
    hash: string;
    name: string;
}

const TitleAndMenu = ({ hash, name, ...props }: Props) => {
    const styles = useStyles();
    const contextMenuItems = useContextMenuItems(hash, name);

    return (
        <Box {...props} className={styles.classes.root}>
            <ResponsiveText size='xl'>{name}</ResponsiveText>
            <ContextMenu items={contextMenuItems} />
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

export default React.memo(TitleAndMenu);
