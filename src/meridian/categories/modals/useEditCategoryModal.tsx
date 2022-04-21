import React from 'react';
import { t } from '@lingui/macro';
import { useModals } from '@mantine/modals';
import { Button, TextInput } from '@mantine/core';
import { Category } from 'meridian/models';
import { useCreateResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';

interface Props {
    category: Category;
}

const EditCategoryModal = ({ category: categoryToEdit }: Props) => {
    const modals = useModals();
    const [category, setCategory] = React.useState(categoryToEdit);
    const createCategory = useCreateResource(Resource.CATEGORIES);

    const onValueChanged = (value: string, field: keyof Category) =>
        setCategory({ ...category, [field]: value });

    const onSubmit = React.useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (category.savePath !== '') {
                createCategory({ category, editExisting: true });
                modals.closeAll();
            }
        },
        [modals, category, createCategory]
    );

    return (
        <form onSubmit={onSubmit}>
            <TextInput
                mt='md'
                label='Save path'
                value={category.savePath}
                onChange={event =>
                    onValueChanged(event.target.value.toString(), 'savePath')
                }
            />
            <Button type='submit' mt='md' fullWidth>
                Submit
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
            centered: true,
        });
};

export default useEditCategoryModal;
