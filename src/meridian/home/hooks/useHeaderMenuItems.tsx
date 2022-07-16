import React from 'react';

import { t } from '@lingui/macro';
import {
    BoxMultiple,
    DeviceDesktop,
    Edit,
    InfoCircle,
    Settings,
    Tag,
    User,
} from 'tabler-icons-react';

import { useCategoriesModal } from 'meridian/categories';
import { ContextMenuItem } from 'meridian/generic';
import { useLogout } from 'meridian/hooks';
import { useServerStateModal } from 'meridian/mainData';
import { usePreferencesModal } from 'meridian/preferences';
import { useSettingsModal } from 'meridian/settings';
import { useTagsModal } from 'meridian/tags';
import useAboutModal from 'meridian/useAboutModal';

const useHeaderMenuItems = (): ContextMenuItem[] => {
    const openSettingsModal = useSettingsModal();
    const openPreferencesModal = usePreferencesModal();
    const openCategoriesModal = useCategoriesModal();
    const openTagsModal = useTagsModal();
    const openServerStateModal = useServerStateModal();
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
            text: t`Server state`,
            icon: <DeviceDesktop />,
            callback: openServerStateModal,
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
