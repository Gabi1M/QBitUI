import React from 'react';
import { Badge, Box, createStyles, Text } from '@mantine/core';

interface Props {
    label: string;
    text: string;
}

const LabelWithBadge = ({ label, text }: Props) => {
    const styles = useStyles();
    const items = text.trim().split(',');

    return (
        <Box>
            <Text className={styles.classes.label}>{label}</Text>
            {items.map(item => (
                <Badge mr={5} key={item}>
                    {item}
                </Badge>
            ))}
        </Box>
    );
};

const useStyles = createStyles(theme => ({
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },
}));

export default LabelWithBadge;
