import React from 'react';

import { t } from '@lingui/macro';

import { useForm } from '@mantine/hooks';

import { LoginData } from 'meridian/models';

const useLoginForm = () => {
    const initialValues: LoginData = {
        username: '',
        password: '',
    };

    return useForm({
        initialValues,
        validationRules: {
            username: (value) => value !== '',
            password: (value) => value !== '',
        },
        errorMessages: {
            username: t`Username cannot be empty`,
            password: t`Password cannot be empty`,
        },
    });
};

export default useLoginForm;
