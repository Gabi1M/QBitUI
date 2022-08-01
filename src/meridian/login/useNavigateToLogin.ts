import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'meridian/navigation/types';

export const useNavigateToLogin = () => {
    const navigate = useNavigate();
    return useCallback(() => navigate(AppRoutes.LOGIN), [navigate]);
};
