import React from 'react';
import { useSelector } from 'react-redux';

import { t } from '@lingui/macro';
import { Trash } from 'tabler-icons-react';

import { ActionIcon, Box, Button, Group, LoadingOverlay, Text, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useDeleteResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';

import { selectTags } from '../state';

import useCreateTagModal from './useCreateTagModal';

const TagsModal = () => {
    const styles = useStyles();
    const tags = useSelector(selectTags);
    const openCreateTagModal = useCreateTagModal();
    const deleteTags = useDeleteResource(Resource.TAGS);

    if (!tags) {
        return <LoadingOverlay visible />;
    }

    const createOnDeleteClickHandler = (tag: string) => () => deleteTags([tag]);

    return (
        <>
            {tags.map((tag, key) => (
                <Group mt='md' key={key}>
                    <Text>{tag}</Text>
                    <Box className={styles.classes.space} />
                    <ActionIcon onClick={createOnDeleteClickHandler(tag)}>
                        <Trash />
                    </ActionIcon>
                </Group>
            ))}
            <Button fullWidth mt='md' onClick={openCreateTagModal}>{t`New`}</Button>
        </>
    );
};

const useTagsModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Tags`,
            children: <TagsModal />,
            ...commonModalConfiguration,
        });
};

const useStyles = createStyles({
    space: {
        flexGrow: 1,
    },
});

export default useTagsModal;
