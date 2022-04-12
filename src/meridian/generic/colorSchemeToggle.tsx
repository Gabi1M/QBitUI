import React from 'react';
import { ActionIcon } from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';
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
                    })
                )
            }
            sx={theme => ({
                color:
                    theme.colorScheme === 'dark'
                        ? theme.colors.yellow[4]
                        : theme.colors.blue[6],
            })}
        >
            {!settings.darkMode ? <Sun size={18} /> : <MoonStars size={18} />}
        </ActionIcon>
    );
};

export default ColorSchemeToggle;
