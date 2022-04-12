import React from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
    children: React.ReactNode;
}

const SnackbarProvider = ({ children }: Props) => (
    <>
        {children}
        <Toaster />
    </>
);

export default SnackbarProvider;
