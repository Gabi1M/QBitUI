import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import HomePage from 'meridian/home/homePage';
import LoginPage from 'meridian/login/loginPage';
import { AppRoutes } from './types';
import { history } from './history';

const AppRouter = () => {
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location,
    });

    React.useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            navigator={history}
            navigationType={state.action}
            location={state.location}
        >
            <Routes>
                <Route path={AppRoutes.HOME} element={<HomePage />} />
                <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
