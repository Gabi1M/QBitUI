import React from 'react';
import { Provider } from 'react-redux';

import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

import AppThemeProvider from 'meridian/ThemeProvider';
import { I18nProvider } from 'meridian/i18n';
import { AppRouter } from 'meridian/navigation';
import { createStore } from 'meridian/state';

const App = () => (
    <Provider store={createStore()}>
        <I18nProvider>
            <AppThemeProvider>
                <ModalsProvider>
                    <NotificationsProvider limit={5} position='bottom-left'>
                        <AppRouter />
                    </NotificationsProvider>
                </ModalsProvider>
            </AppThemeProvider>
        </I18nProvider>
    </Provider>
);

export default App;
