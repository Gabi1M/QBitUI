import React from 'react';
import { ActionIcon, Box, Center, createStyles, SegmentedControl } from '@mantine/core';
import { Moon, MoonStars, Sun } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { createSetSettingsAction, selectSettings } from 'meridian/settings';

const ColorSchemeToggle = () => {
    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();

    return (
        <ActionIcon
            onClick={() =>
                dispatch(
                    createSetSettingsAction({
                        ...settings,
                        darkMode: !settings.darkMode,
                    }),
                )
            }
            sx={(theme) => ({
                color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
            })}
        >
            {!settings.darkMode ? <Sun size={18} /> : <MoonStars size={18} />}
        </ActionIcon>
    );
};

const SegmentedColorSchemeToggle = () => {
    const styles = useStyles();
    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();
    const scheme = settings.darkMode ? 'dark' : 'light';
    return (
        <SegmentedControl
            className={styles.classes.segmentedControl}
            value={scheme}
            onChange={() =>
                dispatch(
                    createSetSettingsAction({
                        ...settings,
                        darkMode: !settings.darkMode,
                    }),
                )
            }
            data={[
                {
                    value: 'light',
                    label: (
                        <Center>
                            <Sun size={16} />
                            <Box ml={10}>Light</Box>
                        </Center>
                    ),
                },
                {
                    value: 'dark',
                    label: (
                        <Center>
                            <Moon size={16} />
                            <Box ml={10}>Dark</Box>
                        </Center>
                    ),
                },
            ]}
        />
    );
};

const useStyles = createStyles({
    segmentedControl: {
        width: '100%',
    },
});

export { ColorSchemeToggle, SegmentedColorSchemeToggle };
