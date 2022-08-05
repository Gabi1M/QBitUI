/* eslint-disable no-restricted-imports */
import React, { useLayoutEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';

import HomePage from 'meridian/home/homePage';
import LoginPage from 'meridian/login/loginPage';

import { history } from './history';
import { AppRoutes } from './types';

const AppRouter = () => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => history.listen(setState), []);

    return (
        <Router navigator={history} navigationType={state.action} location={state.location}>
            <Routes>
                <Route path={AppRoutes.HOME} element={<HomePage />} />
                <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
