import React from 'react';

import { t } from '@lingui/macro';

import { Select, Switch } from '@mantine/core';
import { useModals } from '@mantine/modals';

import { commonModalConfiguration } from 'meridian/generic';
import { LanguagePicker } from 'meridian/i18n';

import useSettings from './useSettings';

const SettingsModal = () => {
    const { settings, handleSettingsChange } = useSettings();

    const handlers = {
        torrentsPerPage: (value: string) => handleSettingsChange('torrentsPerPage', Number(value)),
        autoRefresh: (event: React.ChangeEvent<HTMLInputElement>) =>
            handleSettingsChange('autoRefresh', event.target.checked),
        autoRefreshInterval: (value: string) =>
            handleSettingsChange('autoRefreshInterval', Number(value)),
    };

    return (
        <>
            <LanguagePicker />
            <Select
                mt='md'
                label={t`Torrents per page`}
                value={settings.torrentsPerPage.toString()}
                data={[5, 10, 30, 60].map((x) => x.toString())}
                onChange={handlers['torrentsPerPage']}
            />
            <Switch
                mt='md'
                label={t`Auto refresh`}
                checked={settings.autoRefresh}
                onChange={handlers['autoRefresh']}
            />
            <Select
                mt='md'
                disabled={!settings.autoRefresh}
                label={t`Auto refresh interval`}
                value={settings.autoRefreshInterval.toString()}
                data={[1, 5, 10, 30, 60].map((x) => x.toString())}
                onChange={handlers['autoRefreshInterval']}
            />
        </>
    );
};

const useSettingsModal = () => {
    const modals = useModals();

    return () =>
        modals.openModal({
            title: t`WebUI Settings`,
            children: <SettingsModal />,
            ...commonModalConfiguration,
        });
};

export default useSettingsModal;
