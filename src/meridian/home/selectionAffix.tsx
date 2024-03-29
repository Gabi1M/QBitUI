import React, { useMemo } from 'react';

import { t } from '@lingui/macro';
import {
    ClearAll,
    Download,
    FileCheck,
    FoldDown,
    FoldUp,
    PlayerPause,
    PlayerPlay,
    Trash,
} from 'tabler-icons-react';

import { ActionIcon, Affix, Transition } from '@mantine/core';

import { useDeleteTorrentsModal, useTorrentActions } from 'meridian/torrent';

interface Props {
    hashes: string[];
    selectionEnabled: boolean;
    setSelectionEnabled: (enabled: boolean) => void;
    clearSelection: () => void;
}

interface TorrentActionButton {
    icon: React.ReactElement;
    label: string;
    callback: (hashes: string[]) => void;
}

const SelectionAffix = ({
    hashes,
    selectionEnabled,
    setSelectionEnabled,
    clearSelection,
}: Props) => {
    const { pauseTorrents, resumeTorrents, forceDownloadTorrents, recheckTorrents } =
        useTorrentActions();
    const deleteTorrents = useDeleteTorrentsModal();

    const actions: TorrentActionButton[] = useMemo(
        () => [
            {
                icon: <PlayerPause />,
                label: t`Pause`,
                callback: pauseTorrents,
            },
            {
                icon: <PlayerPlay />,
                label: t`Resume`,
                callback: resumeTorrents,
            },
            {
                icon: <Download />,
                label: t`Force download`,
                callback: forceDownloadTorrents,
            },
            {
                icon: <FileCheck />,
                label: t`Recheck`,
                callback: recheckTorrents,
            },
            {
                icon: <Trash />,
                label: t`Delete`,
                callback: deleteTorrents,
            },
            {
                icon: <ClearAll />,
                label: t`Clear selection`,
                callback: clearSelection,
            },
        ],
        [
            pauseTorrents,
            resumeTorrents,
            forceDownloadTorrents,
            recheckTorrents,
            deleteTorrents,
            clearSelection,
        ],
    );

    const toggleSelection = () => setSelectionEnabled(!selectionEnabled);

    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition='slide-up' mounted={selectionEnabled}>
                {(transitionStyles) => (
                    <>
                        {actions.map((action, key) => (
                            <ActionIcon
                                key={key}
                                title={action.label}
                                onClick={() => action.callback(hashes)}
                                mt={10}
                                variant='filled'
                                color='blue'
                                size='xl'
                                radius='xl'
                                style={transitionStyles}
                            >
                                {action.icon}
                            </ActionIcon>
                        ))}
                    </>
                )}
            </Transition>
            <ActionIcon
                title={t`Manage selection`}
                onClick={toggleSelection}
                mt={10}
                variant='filled'
                color='blue'
                size='xl'
                radius='xl'
            >
                {selectionEnabled ? <FoldDown /> : <FoldUp />}
            </ActionIcon>
        </Affix>
    );
};

export default SelectionAffix;
