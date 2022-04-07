import React from 'react';
import { t } from '@lingui/macro';
import { useSelector } from 'react-redux';
import { ActionIcon, Box, Button, createStyles, Group, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { Trash } from 'tabler-icons-react';
import { useDeleteResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';
import useCreateTagModal from './useCreateTagModal';
import { selectTags } from '../state';

const TagsModal = () => {
    const styles = useStyles();
    const tags = useSelector(selectTags);
    const openCreateTagModal = useCreateTagModal();
    const deleteTags = useDeleteResource(Resource.TAGS);

    if(!tags) {
        return (
            <>
                <Button fullWidth mt='md' onClick={openCreateTagModal}>{t`New`}</Button>
            </>
        );
    }

    return (
        <>
            {tags.map(tag => (
                <Group mt='md'>
                    <Text>{tag}</Text>
                    <Box className={styles.classes.space} />
                    <ActionIcon onClick={() => deleteTags([tag])}><Trash /></ActionIcon>
                </Group>
            ))}
            <Button fullWidth mt='md' onClick={openCreateTagModal}>{t`New`}</Button>
        </>
    )
};

const useTagsModal = () => {
    const modals = useModals();

    return () => modals.openModal({
        title: t`Tags`,
        children: <TagsModal />,
        centered: true,
    });
};

const useStyles = createStyles({
    space: {
        flexGrow: 1,
    }
})

export default useTagsModal;