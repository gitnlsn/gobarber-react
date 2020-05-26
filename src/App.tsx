import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { AuthProvider, useAuth } from './context/Auth';
import { ToastProvider } from './context/Toast';

import Routes from './routes';

const App: React.FC = () => {

    return (
        <Router>
            <AuthProvider>
                <ToastProvider>
                    <Routes />
                </ToastProvider>
            </AuthProvider>

            <GlobalStyle />
        </Router>
    );
}

export default App;
