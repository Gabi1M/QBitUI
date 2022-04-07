import React from 'react';
import { t } from '@lingui/macro';
import { ActionIcon, Box, Button, createStyles, Group, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useDeleteResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';
import { useSelector } from 'react-redux';
import { Edit, Trash } from 'tabler-icons-react';
import { selectCategories } from '../state';
import useCreateCategoryModal from './useCreateCategoryModal';
import useEditCategoryModal from './useEditCategoryModal';

const CategoriesModal = () => {
    const styles = useStyles();
    const categories = useSelector(selectCategories);
    const openCreateCategoryModal = useCreateCategoryModal();
    const openEditCategoryModal = useEditCategoryModal();
    const deleteCategories = useDeleteResource(Resource.CATEGORIES);

    if(!categories) {
        return (
            <>
                <Button fullWidth mt='md' onClick={openCreateCategoryModal}>New</Button>
            </>
        );
    }

    return (
        <>
            {Object.keys(categories).map(category => (
                <Group mt='md'>
                    <Text>{categories[category].name}</Text>
                    <Box className={styles.classes.space} />
                    <ActionIcon onClick={() => openEditCategoryModal(categories[category])}><Edit /></ActionIcon>
                    <ActionIcon onClick={() => deleteCategories([categories[category]])}><Trash /></ActionIcon>
                </Group>
            ))}
            <Button fullWidth mt='md' onClick={openCreateCategoryModal}>New</Button>
        </>
    )
};

const useCategoriesModal = () => {
    const modals = useModals();

    return () => modals.openModal({
        title: t`Categories`,
        children: <CategoriesModal />,
        centered: true,
    });
};

const useStyles = createStyles({
    space: {
        flexGrow: 1,
    }
})

export default useCategoriesModal;