import React from 'react';

import { t } from '@lingui/macro';

import { useForm } from '@mantine/form';

import { LoginData } from 'meridian/models';

const useLoginForm = () => {
    const initialValues: LoginData = {
        username: '',
        password: '',
    };

    return useForm({
        initialValues,
        validate: {
            username: (value) => (value !== '' ? null : t`Username cannot be empty`),
            password: (value) => (value !== '' ? null : t`Password cannot be empty`),
        },
    });
};

export default useLoginForm;
