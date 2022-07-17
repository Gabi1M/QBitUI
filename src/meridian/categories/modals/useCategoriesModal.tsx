import React from 'react';
import { useSelector } from 'react-redux';

import { t } from '@lingui/macro';
import { Edit, Trash } from 'tabler-icons-react';

import { ActionIcon, Box, Button, Group, LoadingOverlay, Text, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useDeleteResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';

import { selectCategories } from '../state';

import useCreateCategoryModal from './useCreateCategoryModal';
import useEditCategoryModal from './useEditCategoryModal';

const CategoriesModal = () => {
    const styles = useStyles();
    const categories = useSelector(selectCategories);
    const openCreateCategoryModal = useCreateCategoryModal();
    const openEditCategoryModal = useEditCategoryModal();
    const deleteCategories = useDeleteResource(Resource.CATEGORIES);

    if (!categories) {
        return <LoadingOverlay visible />;
    }

    const createOnEditClickHandler = (categoryName: string) => () =>
        openEditCategoryModal(categories[categoryName]);
    const createOnDeleteClickHandler = (categoryName: string) => () =>
        deleteCategories([categories[categoryName]]);

    return (
        <>
            {Object.keys(categories).map((categoryName, key) => (
                <Group mt='md' key={key}>
                    <Text>{categories[categoryName].name}</Text>
                    <Box className={styles.classes.space} />
                    <ActionIcon onClick={createOnEditClickHandler(categoryName)}>
                        <Edit />
                    </ActionIcon>
                    <ActionIcon onClick={createOnDeleteClickHandler(categoryName)}>
                        <Trash />
                    </ActionIcon>
                </Group>
            ))}
            <Button fullWidth mt='md' onClick={openCreateCategoryModal}>
                {t`New`}
            </Button>
        </>
    );
};

const useCategoriesModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Categories`,
            children: <CategoriesModal />,
            ...commonModalConfiguration,
        });
};

const useStyles = createStyles({
    space: {
        flexGrow: 1,
    },
});

export default useCategoriesModal;
