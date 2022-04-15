import React from 'react';
import {
    Card as LibCard,
    Text,
    createStyles,
    Group,
    RingProgress,
    Badge,
    Box,
    MantineStyleSystemProps,
    Progress,
} from '@mantine/core';
import { truncateLongText } from 'meridian/utils';
import ContextMenu, { ContextMenuItem } from './contextMenu';
import useWindowSize from './useWindowSize';

export interface CardItemProps {
    name: string;
    value: string | string[];
    type?: 'default' | 'badge';
}

interface Props extends MantineStyleSystemProps {
    title: string;
    itemGroups: CardItemProps[][];
    completionTotal?: number;
    completion?: number;
    contextMenuItems?: ContextMenuItem[];
}

const Card = ({
    title,
    itemGroups,
    completion,
    completionTotal,
    contextMenuItems,
    ...props
}: Props) => {
    const styles = useStyles();
    const { width } = useWindowSize();

    return (
        <LibCard
            {...props}
            className={styles.classes.card}
            withBorder
            radius='md'
        >
            <div className={styles.classes.inner}>
                <div>
                    <Text size='xl' className={styles.classes.label}>
                        {width < 400 ? truncateLongText(title) : title}
                    </Text>
                    {itemGroups.map((itemGroup, index) => (
                        <Group key={index} mt='lg'>
                            {itemGroup.map(item => (
                                <CardItem key={item.name} {...item} />
                            ))}
                        </Group>
                    ))}
                    {completion && completionTotal && width < 400 ? (
                        <Progress
                            mt='md'
                            size='xl'
                            value={completion}
                            label={`${(
                                (completion / completionTotal) *
                                100
                            ).toFixed(0)}%`}
                        />
                    ) : null}
                    {contextMenuItems ? (
                        <Box mt='md'>
                            <ContextMenu items={contextMenuItems} />
                        </Box>
                    ) : null}
                </div>

                {completion && completionTotal && width > 400 ? (
                    <div className={styles.classes.ring}>
                        <RingProgress
                            roundCaps
                            thickness={6}
                            size={150}
                            sections={[
                                {
                                    value: (completion / completionTotal) * 100,
                                    color: styles.theme.colors.green[4],
                                },
                            ]}
                            label={
                                <div>
                                    <Text
                                        align='center'
                                        size='lg'
                                        className={styles.classes.label}
                                        sx={{ fontSize: 22 }}
                                    >
                                        {(
                                            (completion / completionTotal) *
                                            100
                                        ).toFixed(0)}
                                        %
                                    </Text>
                                </div>
                            }
                        />
                    </div>
                ) : null}
            </div>
        </LibCard>
    );
};

const CardItem = ({ name, value, type = 'default' }: CardItemProps) => {
    const styles = useStyles();

    const renderValue = () => {
        switch (type) {
            case 'badge': {
                return typeof value === 'string' ? (
                    <Badge mt={5}>{value}</Badge>
                ) : (
                    value.map(itm => (
                        <Badge key={itm} mt={5}>
                            {itm}
                        </Badge>
                    ))
                );
            }
            case 'default':
            default: {
                return (
                    <Text size='xs' color='dimmed'>
                        {typeof value === 'string' ? value : value.join(',')}
                    </Text>
                );
            }
        }
    };

    return (
        <div key={name}>
            <Text className={styles.classes.label}>{name}</Text>
            {renderValue()}
        </div>
    );
};

const useStyles = createStyles(theme => ({
    card: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.cyan[1],
    },

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },

    lead: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        fontSize: 22,
        lineHeight: 1,
    },

    inner: {
        display: 'flex',
        alignItems: 'center',

        [theme.fn.smallerThan(400)]: {
            flexDirection: 'column',
        },
    },

    ring: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',

        [theme.fn.smallerThan(350)]: {
            justifyContent: 'center',
            marginTop: theme.spacing.md,
        },
    },
}));

export default Card;
