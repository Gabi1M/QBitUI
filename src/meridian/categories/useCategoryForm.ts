import React from 'react';

import { t } from '@lingui/macro';

import { useForm } from '@mantine/form';

import { Category } from 'meridian/models';

const useCategoryForm = (category?: Category) => {
    const initialValues = category ?? {
        name: '',
        savePath: '',
    };

    return useForm({
        initialValues,
        validate: {
            name: (value) => (value !== '' ? null : t`Name cannot be empty`),
            savePath: (value) => (value !== '' ? null : t`Save path cannot be empty`),
        },
    });
};

export default useCategoryForm;
