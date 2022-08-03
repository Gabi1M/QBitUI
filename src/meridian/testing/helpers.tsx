import React from 'react';
import { Provider } from 'react-redux';

import { ModalsProvider } from '@mantine/modals';

import { createStore } from 'meridian/state';
import { GlobalState } from 'meridian/state/types';

export const withReduxState = (element: React.ReactNode, state?: GlobalState) => {
    return <Provider store={createStore(state)}>{element}</Provider>;
};

export const withMantineModals = (element: React.ReactNode) => {
    return <ModalsProvider>{element}</ModalsProvider>;
};

export const addTestId = (testId: string) => ({
    ['data-testid']: testId,
});
