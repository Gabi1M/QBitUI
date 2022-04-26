import React from 'react';
import { useDispatch } from 'react-redux';
import {
    createAddTorrentsTagsAction,
    createDeleteTorrentAction,
    createForceDownloadTorrentsAction,
    createPauseTorrentAction,
    createRecheckTorrentsAction,
    createRemoveTorrentsTagsAction,
    createResumeTorrentAction,
    createSetTorrentCategoryAction,
} from './state';

export const usePauseTorrents = () => {
    const dispatch = useDispatch();
    return React.useCallback(
        (hashes: string[]) => {
            dispatch(createPauseTorrentAction(hashes));
        },
        [dispatch]
    );
};

export const useResumeTorrents = () => {
    const dispatch = useDispatch();
    return React.useCallback(
        (hashes: string[]) => {
            dispatch(createResumeTorrentAction(hashes));
        },
        [dispatch]
    );
};

export const useDeleteTorrents = () => {
    const dispatch = useDispatch();
    return React.useCallback(
        (hashes: string[], deleteFiles = false) => {
            dispatch(createDeleteTorrentAction(hashes, deleteFiles));
        },
        [dispatch]
    );
};

export const useForceDownloadTorrents = () => {
    const dispatch = useDispatch();
    return React.useCallback(
        (hashes: string[]) => {
            dispatch(createForceDownloadTorrentsAction(hashes));
        },
        [dispatch]
    );
};

export const useRecheckTorrents = () => {
    const dispatch = useDispatch();
    return React.useCallback(
        (hashes: string[]) => {
            dispatch(createRecheckTorrentsAction(hashes));
        },
        [dispatch]
    );
};

export const useSetTorrentCategory = () => {
    const dispatch = useDispatch();
    return React.useCallback(
        (hashes: string[], categoryName: string) => {
            dispatch(createSetTorrentCategoryAction(hashes, categoryName));
        },
        [dispatch]
    );
};

export const useManageTorrentTags = () => {
    const dispatch = useDispatch();

    const addTags = React.useCallback(
        (hashes: string[], tags: string[]) => {
            dispatch(createAddTorrentsTagsAction(hashes, tags));
        },
        [dispatch]
    );

    const removeTags = React.useCallback(
        (hashes: string[], tags: string[]) => {
            dispatch(createRemoveTorrentsTagsAction(hashes, tags));
        },
        [dispatch]
    );

    return {
        addTags,
        removeTags,
    };
};

export const useTorrentActions = () => {
    const pauseTorrents = usePauseTorrents();
    const resumeTorrents = useResumeTorrents();
    const forceDownloadTorrents = useForceDownloadTorrents();
    const recheckTorrents = useRecheckTorrents();
    const deleteTorrents = useDeleteTorrents();

    return {
        pauseTorrents,
        resumeTorrents,
        forceDownloadTorrents,
        recheckTorrents,
        deleteTorrents,
    };
};
