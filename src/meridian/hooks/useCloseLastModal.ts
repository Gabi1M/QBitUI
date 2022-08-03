import React, { useCallback } from 'react';

import { useModals } from '@mantine/modals';

export const useCloseLastModal = () => {
    const modals = useModals();

    return useCallback(() => {
        const lastModal = modals.modals.length
            ? modals.modals[modals.modals.length - 1]
            : undefined;
        if (lastModal) {
            modals.closeModal(lastModal.id);
        }
    }, [modals]);
};
