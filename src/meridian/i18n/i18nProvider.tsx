import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { i18n } from '@lingui/core';
import { I18nProvider as LibProvider } from '@lingui/react';

/* eslint-disable-next-line no-restricted-imports */
import { messages as enMessages } from 'locales/en/messages';

/* eslint-disable-next-line no-restricted-imports */
import { messages as roMessages } from 'locales/ro/messages';

import { selectSettings } from 'meridian/settings';

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

    useEffect(() => {
        i18n.activate(settings.language || Language.ENGLISH);
    }, [settings]);

    return <LibProvider i18n={i18n}>{children}</LibProvider>;
};

export default I18nProvider;
