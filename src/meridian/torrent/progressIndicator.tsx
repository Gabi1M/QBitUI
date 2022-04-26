import React from 'react';
import { createStyles, RingProgress, Text } from '@mantine/core';
import { useWindowSize } from 'meridian/generic';

interface Props {
    progress: number;
}

const ProgressIndicator = ({ progress }: Props) => {
    const styles = useStyles();
    const { width } = useWindowSize();
    const isSmallDevice = width < 450;

    const sections = [
        {
            value: progress,
            color: styles.theme.colors.green[4],
        },
    ];

    return (
        <RingProgress
            className={styles.classes.progress}
            roundCaps
            size={isSmallDevice ? 50 : 150}
            thickness={isSmallDevice ? 3 : 7}
            sections={sections}
            label={
                <Text size={isSmallDevice ? 'xs' : 'md'} align='center'>
                    {progress.toFixed(0)}%
                </Text>
            }
        />
    );
};

const useStyles = createStyles({
    progress: {
        alignSelf: 'center',
    },
});

export default React.memo(ProgressIndicator);
