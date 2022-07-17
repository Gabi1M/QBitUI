import React from 'react';

import { t } from '@lingui/macro';

import { useForm } from '@mantine/hooks';

import { Category } from 'meridian/models';

const useCategoryForm = (category?: Category) => {
    const initialValues = category ?? {
        name: '',
        savePath: '',
    };

    return useForm({
        initialValues,
        validationRules: {
            name: (value) => value !== '',
            savePath: (value) => value !== '',
        },
        errorMessages: {
            name: t`Name cannot be empty`,
            savePath: t`Save path cannot be empty`,
        },
    });
};

export default useCategoryForm;
