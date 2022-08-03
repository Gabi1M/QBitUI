import React from 'react';

import { t } from '@lingui/macro';

import { useForm } from '@mantine/form';

const useTagForm = () => {
    const initialValues = {
        tagName: '',
    };

    return useForm({
        initialValues,
        validate: {
            tagName: (value) => (value !== '' ? null : t`Name cannot be empty`),
        },
    });
};

export default useTagForm;
