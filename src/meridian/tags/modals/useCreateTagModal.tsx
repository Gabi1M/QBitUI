import React from 'react';

import { t } from '@lingui/macro';

import { Button, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useCloseLastModal, useCreateResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';

const CreateTagModal = () => {
    const closeLastModal = useCloseLastModal();
    const [tagName, setTagName] = React.useState('');
    const createTags = useCreateResource(Resource.TAGS);

    const onSubmit = React.useCallback(() => {
        createTags([tagName]);
        closeLastModal();
    }, [closeLastModal, createTags, tagName]);

    return (
        <>
            <TextInput
                label={t`Name`}
                value={tagName}
                onChange={(event) => setTagName(event.target.value)}
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
            ...commonModalConfiguration,
        });
};

export default useCreateTagModal;
