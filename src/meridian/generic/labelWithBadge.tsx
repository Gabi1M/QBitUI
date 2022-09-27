import React from 'react';

import { Badge, Box, Text, createStyles } from '@mantine/core';

interface Props {
    label: string;
    text: string;
    color?: string;
}

const LabelWithBadge = ({ label, text, color }: Props) => {
    const styles = useStyles(color);
    const items = text.trim().split(',');

    return (
        <Box>
            <Text>{label}</Text>
            {items.map((item) => (
                <Badge
                    className={styles.classes.badge}
                    color={
                        color && Object.keys(styles.theme.colors).includes(color)
                            ? color
                            : undefined
                    }
                    mr={5}
                    key={item}
                >
                    {item}
                </Badge>
            ))}
        </Box>
    );
};

const useStyles = (color: string | undefined) =>
    createStyles((theme) => {
        const appliedColor =
            !color || Object.keys(theme.colors).includes(color) ? undefined : color;
        return {
            badge: {
                backgroundColor: appliedColor,
            },
        };
    })();

export default LabelWithBadge;
