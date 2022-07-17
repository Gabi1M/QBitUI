import React from 'react';

import { useForm } from '@mantine/hooks';

import { AddTorrentsParams } from 'meridian/api';

const useAddTorrentForm = () => {
    const initialValues: AddTorrentsParams = {
        urls: [],
        tags: [],
        torrents: [],
        paused: false,
        skipChecking: false,
        rootFolder: true,
        autoTMM: true,
    };

    return useForm({
        initialValues,
    });
};

export default useAddTorrentForm;
