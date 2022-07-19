import React from 'react';

import { t } from '@lingui/macro';

import { Button, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useCloseLastModal, useCreateResource } from 'meridian/hooks';
import { Category } from 'meridian/models';
import { Resource } from 'meridian/resource';

import useCategoryForm from '../useCategoryForm';

interface Props {
    category: Category;
}

const EditCategoryModal = ({ category: categoryToEdit }: Props) => {
    const closeLastModal = useCloseLastModal();
    const createCategory = useCreateResource(Resource.CATEGORIES);
    const form = useCategoryForm(categoryToEdit);

    const onSubmit = (category: Category) => {
        createCategory({ category, editExisting: true });
        closeLastModal();
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput mt='md' label={t`Save path`} {...form.getInputProps('savePath')} />
            <Button type='submit' mt='md' fullWidth>
                {t`Submit`}
            </Button>
        </form>
    );
};

const useEditCategoryModal = () => {
    const modals = useModals();

    return (category: Category) =>
        modals.openModal({
            title: `${t`Edit`} ${category.name}`,
            children: <EditCategoryModal category={category} />,
            ...commonModalConfiguration,
        });
};

export default useEditCategoryModal;
