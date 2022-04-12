import {
    ActionIcon,
    Box,
    createStyles,
    Drawer,
    Header,
    useMantineTheme,
} from '@mantine/core';
import React, { useState } from 'react';
import { Menu2 } from 'tabler-icons-react';
import ColorSchemeToggle from './colorSchemeToggle';

interface Props {
    children: React.ReactNode;
    drawerContent?: React.ReactNode;
    headerRightContent?: React.ReactNode;
}

const DrawerPage = ({ children, drawerContent, headerRightContent }: Props) => {
    const styles = useStyles();
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Drawer
                className={styles.classes.drawer}
                opened={opened}
                onClose={() => setOpened(false)}
                title='QBitUI'
                padding='xl'
                size='sm'
            >
                {drawerContent}
            </Drawer>
            <div className={styles.classes.root}>
                <Header className={styles.classes.header} height={50}>
                    <ActionIcon onClick={() => setOpened(true)}>
                        <Menu2 />
                    </ActionIcon>
                    <Box className={styles.classes.space} />
                    <ColorSchemeToggle />
                    {headerRightContent}
                </Header>
                <Box className={styles.classes.content}>{children}</Box>
            </div>
        </>
    );
};

const useStyles = () => {
    const theme = useMantineTheme();

    return createStyles({
        root: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
        },
        drawer: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        content: {
            display: 'flex',
            overflow: 'scroll',
            flex: 1,
            flexDirection: 'column',
            backgroundColor:
                theme.colorScheme === 'light'
                    ? theme.white
                    : theme.colors.dark[5],
        },
        space: {
            flexGrow: 1,
        },
    })();
};

export default DrawerPage;
