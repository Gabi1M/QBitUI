import React from 'react';

import { t } from '@lingui/macro';

import { Button, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { useCloseLastModal, useCreateResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';

import useTagForm from '../useTagsForm';

const CreateTagModal = () => {
    const closeLastModal = useCloseLastModal();
    const form = useTagForm();
    const createTags = useCreateResource(Resource.TAGS);

    const onSubmit = ({ tagName }: { tagName: string }) => {
        createTags([tagName]);
        closeLastModal();
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput label={t`Name`} {...form.getInputProps('tagName')} />
            <Button type='submit' mt='md' fullWidth>{t`Submit`}</Button>
        </form>
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
