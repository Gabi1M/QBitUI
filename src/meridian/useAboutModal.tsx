import React from 'react';
import { useSelector } from 'react-redux';

import { Anchor, Avatar, Box, Text, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from './generic';
import { Icons } from './icons';
import { selectVersions } from './session';

const AboutModal = () => {
    const styles = useStyles();
    const versions = useSelector(selectVersions);

    return (
        <Box className={styles.classes.logo}>
            <Avatar size='xl' src={Icons.LOGO} />
            <Text mt='lg' size='lg'>
                Version {import.meta.env.VITE_VERSION}
            </Text>
            <Anchor<'a'> href='https://www.qbittorrent.org/' mt='lg' weight={700}>
                QBitTorrent {versions.version} API {versions.apiVersion}
            </Anchor>
            <Text mt='lg' size='lg'>
                Powered by{' '}
                <Anchor<'a'> href='https://mantine.dev/' weight={700}>
                    Mantine
                </Anchor>
            </Text>
        </Box>
    );
};

const useAboutModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            children: <AboutModal />,
            ...commonModalConfiguration,
        });
};

const useStyles = createStyles({
    logo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default useAboutModal;
