import React from 'react';
import { t } from '@lingui/macro';
import { useModals } from '@mantine/modals';
import { Button, TextInput } from '@mantine/core';
import { Resource } from 'meridian/resource';
import { useCreateResource } from 'meridian/hooks';

const CreateTagModal = () => {
    const modals = useModals();
    const [tagName, setTagName] = React.useState('');
    const createTags = useCreateResource(Resource.TAGS);

    const onSubmit = React.useCallback(() => {
        createTags([tagName]);
        modals.closeAll();
    }, [modals, createTags, tagName]);

    return (
        <>
            <TextInput
                label={t`Name`}
                value={tagName}
                onChange={event => setTagName(event.target.value)}
            />
            <Button mt='md' fullWidth onClick={onSubmit}>{t`Submit`}</Button>
        </>
    );
};

const useCreateTagModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Create new tag`,
            children: <CreateTagModal />,
            centered: true,
        });
};

export default useCreateTagModal;
