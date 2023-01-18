import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import { Button, Checkbox, Select } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { AddTorrentsParams } from 'meridian/api';
import { selectCategories } from 'meridian/categories';
import { Dropzone, commonModalConfiguration } from 'meridian/generic';
import { useCloseLastModal, useCreateResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';
import { showSnackbarAction } from 'meridian/snackbar';

import useAddTorrentForm from '../useAddTorrentForm';

const AddTorrentsModal = () => {
    const closeLastModal = useCloseLastModal();
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const addTorrents = useCreateResource(Resource.TORRENT);

    const form = useAddTorrentForm();
    const [files, setFiles] = useState<File[]>([]);

    const onRemoveFile = (file: File) => {
        setFiles(files.filter((x) => x.name !== file.name));
    };

    const onSubmit = useCallback(
        (data: AddTorrentsParams) => {
            if (!files?.length) {
                dispatch(showSnackbarAction(t`Cannot add torrent without files!`, 'error', 2000));
                return;
            }
            if (
                !files.every(
                    (x) =>
                        x.type === 'application/x-bittorrent' ||
                        x.name.split('.').pop()?.toLowerCase() === 'torrent',
                )
            ) {
                dispatch(showSnackbarAction(t`Invalid file types!`, 'error', 2000));
                return;
            }

            addTorrents({
                ...data,
                torrents: files,
            });
            closeLastModal();
        },
        [files, dispatch, addTorrents, closeLastModal],
    );

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Dropzone files={files} onDrop={setFiles} onRemove={onRemoveFile} />
            <Select
                mt='md'
                label={t`Category`}
                placeholder={t`None selected`}
                data={
                    categories
                        ? Object.keys(categories).map((category) => ({
                              value: category,
                              label: category,
                          }))
                        : []
                }
                {...form.getInputProps('category')}
            />
            <Checkbox
                mt='md'
                label={t`Start paused`}
                {...form.getInputProps('paused', {
                    type: 'checkbox',
                })}
            />
            <Checkbox
                mt='md'
                label={t`Skip checking`}
                {...form.getInputProps('skipChecking', {
                    type: 'checkbox',
                })}
            />
            <Checkbox
                mt='md'
                label={t`Create subfolder`}
                {...form.getInputProps('rootFolder', {
                    type: 'checkbox',
                })}
            />
            <Checkbox
                mt='md'
                label={t`Automatic torrent management`}
                {...form.getInputProps('autoTMM', {
                    type: 'checkbox',
                })}
            />
            <Button type='submit' mt='md' fullWidth>{t`Submit`}</Button>
        </form>
    );
};

const useAddTorrentsModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`Add new torrents`,
            children: <AddTorrentsModal />,
            ...commonModalConfiguration,
        });
};

export default useAddTorrentsModal;
