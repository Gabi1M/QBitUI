import React from 'react';

import { t } from '@lingui/macro';

import { Button, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useCreateResource } from 'meridian/hooks';
import { Category } from 'meridian/models';
import { Resource } from 'meridian/resource';

const defaultCategory: Category = {
    name: '',
    savePath: '',
};

const CreateCategoryModal = () => {
    const modals = useModals();
    const [category, setCategory] = React.useState(defaultCategory);
    const createCategory = useCreateResource(Resource.CATEGORIES);

    const onValueChanged = (value: string, field: keyof Category) =>
        setCategory({ ...category, [field]: value });

    const onSubmit = React.useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (category.name !== '' && category.savePath !== '') {
                createCategory({ category });
                modals.closeAll();
            }
        },
        [modals, category, createCategory],
    );

    return (
        <form onSubmit={onSubmit}>
            <TextInput
                mt='md'
                label='Name'
                value={category.name}
                onChange={(event) => onValueChanged(event.target.value.toString(), 'name')}
            />
            <TextInput
                mt='md'
                label='Save path'
                value={category.savePath}
                onChange={(event) => onValueChanged(event.target.value.toString(), 'savePath')}
            />
            <Button type='submit' mt='md' fullWidth>
                Submit
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
