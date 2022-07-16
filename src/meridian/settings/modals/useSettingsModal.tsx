import React from 'react';
import { t } from '@lingui/macro';
import { useModals } from '@mantine/modals';
import { Select, Switch } from '@mantine/core';
import { commonModalConfiguration } from 'meridian/generic';
import { LanguagePicker } from 'meridian/i18n';
import useSettings from './useSettings';

const SettingsModal = () => {
    const { settings, handleSettingsChange } = useSettings();

    return (
        <>
            <LanguagePicker />
            <Select
                mt='md'
                label={t`Torrents per page`}
                value={settings.torrentsPerPage.toString()}
                data={[5, 10, 30, 60].map((x) => x.toString())}
                onChange={(value) => handleSettingsChange('torrentsPerPage', Number(value))}
            />
            <Switch
                mt='md'
                label={t`Auto refresh`}
                checked={settings.autoRefresh}
                onChange={(event) => handleSettingsChange('autoRefresh', event.target.checked)}
            />
            <Select
                mt='md'
                disabled={!settings.autoRefresh}
                label={t`Auto refresh interval`}
                value={settings.autoRefreshInterval.toString()}
                data={[1, 5, 10, 30, 60].map((x) => x.toString())}
                onChange={(value) => handleSettingsChange('autoRefreshInterval', Number(value))}
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
