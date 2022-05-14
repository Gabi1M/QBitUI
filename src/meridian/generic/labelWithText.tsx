import React from 'react';
import {
    Box,
    createStyles,
    MantineStyleSystemProps,
    Text,
} from '@mantine/core';

interface Props extends MantineStyleSystemProps {
    label: string;
    text: string;
}

const LabelWithText = ({ label, text, ...rest }: Props) => {
    const styles = useStyles();

    return (
        <Box {...rest}>
            <Text className={styles.classes.label}>{label}</Text>
            <Text size='sm' color='dimmed'>
                {text}
            </Text>
        </Box>
    );
};

const useStyles = createStyles(theme => ({
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },
}));

export default LabelWithText;
