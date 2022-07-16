import {
    ActionIcon,
    Avatar,
    Box,
    createStyles,
    Drawer,
    Header,
} from '@mantine/core';
import { Icons } from 'meridian/icons';
import React, { useState } from 'react';
import { Menu2 } from 'tabler-icons-react';
import { ColorSchemeToggle } from './colorSchemeToggle';

interface Props {
    children: React.ReactNode;
    drawerContent?: React.ReactNode;
    headerRightContent?: React.ReactNode;
}

const DrawerPage = ({ children, drawerContent, headerRightContent }: Props) => {
    const styles = useStyles();
    const [opened, setOpened] = useState(false);

    return (
        <Box className={styles.classes.content}>
            <Drawer
                className={styles.classes.drawer}
                opened={opened}
                onClose={() => setOpened(false)}
                title={<Avatar size='lg' src={Icons.LOGO} />}
                padding='xl'
                size='sm'
                overlayBlur={5}
            >
                {drawerContent}
            </Drawer>
            <Header className={styles.classes.header} height={50}>
                <ActionIcon onClick={() => setOpened(true)}>
                    <Menu2 />
                </ActionIcon>
                <Box className={styles.classes.space} />
                <ColorSchemeToggle />
                {headerRightContent}
            </Header>
            {children}
        </Box>
    );
};

const useStyles = createStyles(theme => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'sticky',
    },
    drawer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    space: {
        flexGrow: 1,
    },
    content: {
        backgroundColor:
            theme.colorScheme === 'light' ? theme.white : theme.colors.dark[5],
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default DrawerPage;
