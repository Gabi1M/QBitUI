import React from 'react';

import {
    Box,
    DefaultMantineColor,
    MantineStyleSystemProps,
    Text,
    createStyles,
} from '@mantine/core';

interface Props extends MantineStyleSystemProps {
    label: string;
    text: string;
    color?: DefaultMantineColor;
    icon?: React.ReactNode;
}

const LabelWithText = ({ label, text, color, icon, ...rest }: Props) => {
    const styles = useStyles();

    return (
        <Box {...rest} className={styles.classes.root}>
            {icon}
            <Box ml={icon ? 'xs' : undefined}>
                <Text color={color}>{label}</Text>
                <Text size='sm' color={color || 'dimmed'}>
                    {text}
                </Text>
            </Box>
        </Box>
    );
};

const useStyles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default LabelWithText;
