import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../context/Auth';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/dashboard';

const Routes: React.FC = () => {

    const { authState } = useAuth();

    return (
        <Switch>
            {/* LOGIN */}
            <Route path="/login" render={() => {
                /* if not authenticated, redirect to dashboard */
                if (authState.token) return <Redirect to="dashboard"/>;
                return <SignIn />;
            }} />

            {/* REGISTER */}
            <Route path="/register" render={() => {
                /* if not authenticated, redirect to dashboard */
                if (authState.token) return <Redirect to="dashboard"/>;
                return <SignUp />;
            }} />

            {/* DASHBOARD */}
            <Route path="/dashboard" render={() => {
                /* if not authenticated, redirect to login */
                if (authState.token) return <Dashboard />;
                return <Redirect to="login"/>;
            }} />

            {/* DEFAULT: redirect to login */}
            <Route path="/" render={() => <Redirect to="login"/>}/>
        </Switch>
    );
}

export default Routes;

