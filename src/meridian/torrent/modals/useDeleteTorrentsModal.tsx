import React from 'react';

import { t } from '@lingui/macro';

import { Button, Checkbox } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';

import { useDeleteTorrents } from '../hooks';

interface Props {
    hashes: string[];
}

const DeleteTorrentsModal = ({ hashes }: Props) => {
    const modals = useModals();
    const [deleteFiles, setDeleteFiles] = React.useState(false);
    const deleteTorrents = useDeleteTorrents();

    const onSubmit = React.useCallback(() => {
        deleteTorrents(hashes, deleteFiles);
        modals.closeAll();
    }, [modals, deleteFiles, deleteTorrents, hashes]);

    return (
        <>
            <Checkbox
                label={t`Also delete files`}
                checked={deleteFiles}
                onChange={(event) => setDeleteFiles(event.target.checked)}
            />
            <Button mt='md' fullWidth onClick={onSubmit}>{t`Delete`}</Button>
        </>
    );
};

const useDeleteTorrentsModal = () => {
    const modals = useModals();

    return (hashes: string[]) =>
        modals.openModal({
            title: t`Delete torrents`,
            children: <DeleteTorrentsModal hashes={hashes} />,
            ...commonModalConfiguration,
        });
};

export default useDeleteTorrentsModal;
