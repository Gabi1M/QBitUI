import React from 'react';

import { Plus, Settings } from 'tabler-icons-react';

import { ActionIcon } from '@mantine/core';

import { ContextMenu } from 'meridian/generic';
import { useAddTorrentsModal } from 'meridian/torrent';

import { useHeaderMenuItems } from './hooks';

const HeaderContent = () => {
    const openAddTorrentsModal = useAddTorrentsModal();
    const items = useHeaderMenuItems();
    return (
        <>
            <ActionIcon m='sm' onClick={openAddTorrentsModal}>
                <Plus />
            </ActionIcon>
            <ContextMenu
                items={items}
                control={
                    <ActionIcon>
                        <Settings />
                    </ActionIcon>
                }
            />
        </>
    );
};

export default HeaderContent;
