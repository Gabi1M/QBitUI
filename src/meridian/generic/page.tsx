import React from 'react';

import { Box, createStyles, useMantineTheme } from '@mantine/core';

interface Props {
    children: React.ReactNode;
}

const Page = ({ children }: Props) => {
    const styles = useStyles();
    return (
        <div className={styles.classes.root}>
            <Box className={styles.classes.content}>{children}</Box>
        </div>
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
        content: {
            display: 'flex',
            overflow: 'scroll',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.colorScheme === 'light' ? theme.white : theme.colors.dark[5],
        },
    })();
};

export default Page;
