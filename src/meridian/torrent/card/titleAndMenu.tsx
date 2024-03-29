import React, { memo } from 'react';

import { Menu } from 'tabler-icons-react';

import { ActionIcon, Box, MantineStyleSystemProps, Text, createStyles } from '@mantine/core';

import { ContextMenu } from 'meridian/generic';

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
            <Text lineClamp={1} size='xl'>
                {name}
            </Text>
            <ContextMenu
                items={contextMenuItems}
                control={
                    <ActionIcon>
                        <Menu />
                    </ActionIcon>
                }
            />
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

export default memo(TitleAndMenu);
