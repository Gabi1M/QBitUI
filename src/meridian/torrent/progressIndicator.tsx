import React from 'react';
import { Box, createStyles, Progress, Text } from '@mantine/core';

interface Props {
    progress: number;
}

const ProgressIndicator = ({ progress }: Props) => {
    const styles = useStyles();

    const color = progress === 100 ? 'green' : 'cyan';
    const animate = progress !== 100;

    return (
        <Box className={styles.classes.root}>
            <Text weight='bold' color={color}>
                {progress.toFixed(0)}%
            </Text>
            <Progress
                ml='sm'
                className={styles.classes.progress}
                color={color}
                animate={animate}
                value={progress}
            />
        </Box>
    );
};

const useStyles = createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        flex: 1,
    },
});

export default React.memo(ProgressIndicator);
