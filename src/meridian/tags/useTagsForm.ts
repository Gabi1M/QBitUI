import React from 'react';

import { t } from '@lingui/macro';

import { useForm } from '@mantine/hooks';

const useTagForm = () => {
    const initialValues = {
        tagName: '',
    };

    return useForm({
        initialValues,
        validationRules: {
            tagName: (value) => value !== '',
        },
        errorMessages: {
            tagName: t`Name cannot be empty`,
        },
    });
};

export default useTagForm;
