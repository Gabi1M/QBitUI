import React from 'react';
import {
    Box,
    Button,
    createStyles,
    Paper,
    PasswordInput,
    TextInput,
} from '@mantine/core';
import { Page } from 'meridian/generic';
import { useLogin } from 'meridian/hooks';

const LoginPage = () => {
    const styles = useStyles();
    const login = useLogin();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const onClick = React.useCallback(
        () => login(username, password),
        [username, password]
    );
    return (
        <Page>
            <Box className={styles.classes.root}>
                <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
                    <TextInput
                        label='Username'
                        placeholder='Enter your username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        required
                    />
                    <PasswordInput
                        label='Password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                        mt='md'
                    />
                    <Button onClick={onClick} fullWidth mt='xl'>
                        Sign in
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
});

export default LoginPage;
