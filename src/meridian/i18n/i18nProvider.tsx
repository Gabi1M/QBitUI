import React from 'react';
import { useSelector } from 'react-redux';
import { i18n } from '@lingui/core';
import { I18nProvider as LibProvider } from '@lingui/react';
import { selectSettings } from 'meridian/settings';
import { messages as enMessages } from '../../locales/en/messages';
import { messages as roMessages } from '../../locales/ro/messages';
import { Language } from './types';

interface Props {
    children: React.ReactNode;
}

i18n.load({
    [Language.ENGLISH]: enMessages,
    [Language.ROMANIAN]: roMessages,
});

i18n.activate(Language.ENGLISH);

const I18nProvider = ({ children }: Props) => {
    const settings = useSelector(selectSettings);

    React.useEffect(() => {
        i18n.activate(settings.language || Language.ENGLISH);
    }, [settings]);

    return <LibProvider i18n={i18n}>{children}</LibProvider>;
};

export default I18nProvider;
