import React from 'react';

import { t } from '@lingui/macro';

import {
    Avatar,
    Box,
    Button,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    createStyles,
} from '@mantine/core';

import { Page, SegmentedColorSchemeToggle } from 'meridian/generic';
import { useLogin } from 'meridian/hooks';
import { LanguagePicker } from 'meridian/i18n';
import { Icons } from 'meridian/icons';
import { LoginData } from 'meridian/models';

import useLoginForm from './useLoginForm';

const LoginPage = () => {
    const styles = useStyles();
    const login = useLogin();
    const form = useLoginForm();

    const onSubmit = (data: LoginData) => login(data.username, data.password);

    return (
        <Page>
            <Box className={styles.classes.root}>
                <Paper
                    component='form'
                    onSubmit={form.onSubmit(onSubmit)}
                    withBorder
                    shadow='md'
                    p={30}
                    mt={30}
                    radius='md'
                >
                    <Box mb={15} className={styles.classes.logo}>
                        <Avatar size='xl' src={Icons.LOGO} />
                        <Text size='xl'>{t`Welcome to QBitUI`}</Text>
                    </Box>
                    <TextInput
                        required
                        label={t`Username`}
                        placeholder={t`Enter your username`}
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        mt='md'
                        required
                        label={t`Password`}
                        placeholder={t`Enter your password`}
                        {...form.getInputProps('password')}
                    />
                    <Box mt={15}>
                        <LanguagePicker />
                    </Box>
                    <Box mt={15}>
                        <Text weight={500} size='sm'>{t`Theme`}</Text>
                        <SegmentedColorSchemeToggle />
                    </Box>
                    <Button type='submit' fullWidth mt='xl'>
                        {t`Sign in`}
                    </Button>
                </Paper>
            </Box>
        </Page>
    );
};

const useStyles = createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginPage;
