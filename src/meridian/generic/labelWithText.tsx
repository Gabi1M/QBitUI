import React from 'react';
import { Box, createStyles, Text } from '@mantine/core';

interface Props {
    label: string;
    text: string;
}

const LabelWithText = ({ label, text }: Props) => {
    const styles = useStyles();

    return (
        <Box>
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
