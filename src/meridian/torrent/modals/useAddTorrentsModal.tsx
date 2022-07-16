import React from 'react';
import { t } from '@lingui/macro';
import { useDispatch, useSelector } from 'react-redux';
import { useModals } from '@mantine/modals';
import { Button, Checkbox, MultiSelect, Select } from '@mantine/core';
import { selectCategories } from 'meridian/categories';
import { selectTags } from 'meridian/tags';
import { AddTorrentsParams } from 'meridian/api';
import { Category } from 'meridian/models';
import { useCreateResource } from 'meridian/hooks';
import { Resource } from 'meridian/resource';
import { commonModalConfiguration, Dropzone } from 'meridian/generic';
import { showSnackbarAction } from 'meridian/snackbar';

const AddTorrentsModal = () => {
    const modals = useModals();
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const tags = useSelector(selectTags);
    const addTorrents = useCreateResource(Resource.TORRENT);

    const [data, setData] = React.useState<AddTorrentsParams>({
        urls: [],
        torrents: [],
        rootFolder: true,
        autoTMM: true,
    });
    const [files, setFiles] = React.useState<File[]>([]);

    const updateData = React.useCallback(
        (
            field: keyof AddTorrentsParams,
            value: string | string[] | boolean | Category | undefined,
        ) => {
            setData((prev) => ({
                ...prev,
                [field]: value,
            }));
        },
        [setData],
    );

    const onRemoveFile = (file: File) => {
        setFiles(files.filter((x) => x.name !== file.name));
    };

    const onSubmit = React.useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!files?.length) {
                dispatch(showSnackbarAction(t`Cannot add torrent without files!`, 'error', 2000));
                return;
            }
            addTorrents({
                ...data,
                torrents: files,
            });
            modals.closeAll();
        },
        [dispatch, modals, data, files, addTorrents],
    );

    return (
        <form onSubmit={onSubmit}>
            <Dropzone files={files} onDrop={setFiles} onRemove={onRemoveFile} />
            <Select
                mt='md'
                label={t`Category`}
                placeholder={t`None selected`}
                value={data.category?.name}
                data={
                    categories
                        ? Object.keys(categories).map((category) => ({
                              value: category,
                              label: category,
                          }))
                        : []
                }
                onChange={(value) => updateData('category', categories?.[value as string])}
            />
            <MultiSelect
                mt='md'
                label={t`Tags`}
                placeholder={t`None selected`}
                value={data.tags}
                data={tags ? tags.map((tag) => ({ value: tag, label: tag })) : []}
                onChange={(value) => updateData('tags', value)}
            />
            <Checkbox
                mt='md'
                label={t`Start paused`}
                checked={data.paused}
                onChange={(event) => updateData('paused', event.target.checked)}
            />
            <Checkbox
                mt='md'
                label={t`Skip checking`}
                checked={data.skipChecking}
                onChange={(event) => updateData('skipChecking', event.target.checked)}
            />
            <Checkbox
                mt='md'
                label={t`Create subfolder`}
                checked={data.rootFolder}
                onChange={(event) => updateData('rootFolder', event.target.checked)}
            />
            <Checkbox
                mt='md'
                label={t`Automatic torrent management`}
                checked={data.autoTMM}
                onChange={(event) => updateData('autoTMM', event.target.checked)}
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
