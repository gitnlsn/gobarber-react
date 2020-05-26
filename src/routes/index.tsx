import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../context/Auth';

import SignIn from '../pages/session/SignIn';
import SignUp from '../pages/session/SignUp';
import ForgotPassword from '../pages/session/ForgotPassword';
import ResetPassword from '../pages/session/ResetPassword';
import Dashboard from '../pages/Dashboard';

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

            {/* LOGIN */}
            <Route path="/forgot-password" render={() => {
                /* if not authenticated, redirect to dashboard */
                return <ForgotPassword />;
            }} />

            {/* LOGIN */}
            <Route path="/reset-password" render={() => {
                /* if not authenticated, redirect to dashboard */
                return <ResetPassword />;
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
            <Route path="/" render={() => <Redirect to="/login"/>}/>
        </Switch>
    );
}

export default Routes;

