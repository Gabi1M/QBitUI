import React from 'react';

import { t } from '@lingui/macro';

import { Button, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useCloseLastModal, useCreateResource } from 'meridian/hooks';
import { Category } from 'meridian/models';
import { Resource } from 'meridian/resource';

import useCategoryForm from '../useCategoryForm';

const CreateCategoryModal = () => {
    const closeLastModal = useCloseLastModal();
    const createCategory = useCreateResource(Resource.CATEGORIES);
    const form = useCategoryForm();

    const onSubmit = (category: Category) => {
        createCategory({ category });
        closeLastModal();
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput mt='md' label={t`Name`} {...form.getInputProps('name')} />
            <TextInput mt='md' label={t`Save path`} {...form.getInputProps('savePath')} />
            <Button type='submit' mt='md' fullWidth>
                {t`Submit`}
            </Button>
        </form>
    );
};

const useCreateCategoryModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Create new category`,
            children: <CreateCategoryModal />,
            ...commonModalConfiguration,
        });
};

export default useCreateCategoryModal;
