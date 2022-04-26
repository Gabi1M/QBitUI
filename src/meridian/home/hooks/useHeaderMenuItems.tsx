import React from 'react';
import { t } from '@lingui/macro';
import {
    BoxMultiple,
    Edit,
    InfoCircle,
    Settings,
    Tag,
    User,
} from 'tabler-icons-react';
import { ContextMenuItem } from 'meridian/generic';
import { useSettingsModal } from 'meridian/settings';
import { usePreferencesModal } from 'meridian/preferences';
import { useCategoriesModal } from 'meridian/categories';
import { useTagsModal } from 'meridian/tags';
import { useLogout } from 'meridian/hooks';
import useAboutModal from 'meridian/useAboutModal';

const useHeaderMenuItems = (): ContextMenuItem[] => {
    const openSettingsModal = useSettingsModal();
    const openPreferencesModal = usePreferencesModal();
    const openCategoriesModal = useCategoriesModal();
    const openTagsModal = useTagsModal();
    const openAboutModal = useAboutModal();
    const logout = useLogout();
    return [
        {
            text: t`WebUI Settings`,
            icon: <Settings />,
            callback: openSettingsModal,
        },
        {
            text: t`Preferences`,
            icon: <Edit />,
            callback: openPreferencesModal,
        },
        {
            text: t`Categories`,
            icon: <BoxMultiple />,
            callback: openCategoriesModal,
        },
        {
            text: t`Tags`,
            icon: <Tag />,
            callback: openTagsModal,
        },
        {
            text: t`About`,
            icon: <InfoCircle />,
            callback: openAboutModal,
        },
        {
            text: t`Logout`,
            icon: <User />,
            callback: logout,
        },
    ];
};

export default useHeaderMenuItems;
