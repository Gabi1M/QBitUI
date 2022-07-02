import React from 'react';
import { Provider } from 'react-redux';
import { ModalsProvider } from '@mantine/modals';
import { I18nProvider } from 'meridian/i18n';
import { createStore } from 'meridian/state';
import { AppRouter } from 'meridian/navigation';
import { NotificationsProvider } from '@mantine/notifications';
import AppThemeProvider from './ThemeProvider';

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
