import React from 'react';
import { selectSettings } from 'meridian/settings';
import { useSelector } from 'react-redux';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';

interface Props {
    children: React.ReactNode;
}

let themeRef: MantineThemeOverride | null = null;
export const getThemeRef = () => themeRef;

const ThemeProvider = ({ children }: Props) => {
    const settings = useSelector(selectSettings);
    const theme: MantineThemeOverride = React.useMemo(
        () => ({
            colorScheme: settings.darkMode ? 'dark' : 'light',
            colors: {
                'ocean-blue': [
                    '#7AD1DD',
                    '#5FCCDB',
                    '#44CADC',
                    '#2AC9DE',
                    '#1AC2D9',
                    '#11B7CD',
                    '#09ADC3',
                    '#0E99AC',
                    '#128797',
                    '#147885',
                ],
            },
        }),
        [settings],
    );
    themeRef = theme;
    document.body.style.backgroundColor = settings.darkMode ? '#2C2E33' : '#FFFFFF';

    return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default ThemeProvider;
