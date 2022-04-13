import { AppRoutes } from 'meridian/navigation/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigateToLogin = () => {
    const navigate = useNavigate();
    return React.useCallback(() => navigate(AppRoutes.LOGIN), [navigate]);
};
