import React from 'react';
import { Provider } from 'react-redux';
import { ModalsProvider } from '@mantine/modals';
import { SnackbarProvider } from 'meridian/snackbar';
import { I18nProvider } from 'meridian/i18n';
import { createStore } from 'meridian/state';
import { HomePage } from 'meridian/home';
import AppThemeProvider from './ThemeProvider';

const App = () => (
    <Provider store={createStore()}>
        <I18nProvider>
            <AppThemeProvider>
                <ModalsProvider>
                    <SnackbarProvider>
                        <HomePage />
                    </SnackbarProvider>
                </ModalsProvider>
            </AppThemeProvider>
        </I18nProvider>
    </Provider>
);

export default App;
