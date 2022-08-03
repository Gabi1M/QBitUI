import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { MantineProvider, MantineThemeOverride } from '@mantine/core';

import { selectSettings } from 'meridian/settings';

interface Props {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
    const settings = useSelector(selectSettings);
    const theme: MantineThemeOverride = useMemo(
        () => ({
            colorScheme: settings.darkMode ? 'dark' : 'light',
        }),
        [settings],
    );
    document.body.style.backgroundColor = settings.darkMode ? '#2C2E33' : '#FFFFFF';

    return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default ThemeProvider;
