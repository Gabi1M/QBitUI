import React from 'react';
import {
    Box,
    createStyles,
    DefaultMantineColor,
    MantineStyleSystemProps,
    Text,
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
                <Text color={color} className={styles.classes.label}>
                    {label}
                </Text>
                <Text size='sm' color={color || 'dimmed'}>
                    {text}
                </Text>
            </Box>
        </Box>
    );
};

const useStyles = createStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },
}));

export default LabelWithText;
