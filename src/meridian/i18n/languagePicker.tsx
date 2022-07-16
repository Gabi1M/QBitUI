import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { t } from '@lingui/macro';

import { Avatar, Group, Select, Text } from '@mantine/core';

import { createSetSettingsAction, selectSettings } from 'meridian/settings';

import { Language, LanguageIcon, LanguageName } from './types';

interface ItemProps {
    icon: string;
    label: string;
    value: string;
}

const getLanguageItems = (): ItemProps[] => {
    const languages = Object.values(Language);
    return languages.map((language) => ({
        icon: LanguageIcon[language],
        label: LanguageName[language],
        value: language,
    }));
};

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ icon, label, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar size='xs' src={icon} />
                <Text size='sm'>{label}</Text>
            </Group>
        </div>
    ),
);

const LanguagePicker = () => {
    const settings = useSelector(selectSettings);
    const dispatch = useDispatch();
    const data = getLanguageItems();

    const onChange = (value: string) => {
        dispatch(
            createSetSettingsAction({
                ...settings,
                language: value as Language,
            }),
        );
    };

    return (
        <Select
            label={t`Language`}
            icon={<Avatar size='xs' src={LanguageIcon[settings.language]} />}
            value={settings.language}
            itemComponent={SelectItem}
            data={data}
            onChange={onChange}
        />
    );
};

export default LanguagePicker;
