import React from 'react';
import { Box, createStyles, MantineStyleSystemProps, Progress, Text } from '@mantine/core';

interface Props extends MantineStyleSystemProps {
    progress: number;
}

const ProgressIndicator = ({ progress, ...props }: Props) => {
    const styles = useStyles();

    const color = progress === 100 ? 'green' : 'cyan';
    const animate = progress !== 100;

    return (
        <Box {...props} className={styles.classes.root}>
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
