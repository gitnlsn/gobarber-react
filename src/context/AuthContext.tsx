import React, { createContext, useCallback, useState, useContext } from "react";

import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

interface Credentials {
    email: string,
    password: string,
}

interface AuthContextData {
    name: string;
    signIn(crendtials: Credentials): Promise<void>;
    signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@goBarber:token');
        const user = localStorage.getItem('@goBarber:user');

        if (token && user) {
            return ({
                token,
                user: JSON.parse(user),
            });
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({
        email,
        password,
    }: Credentials): Promise<void> => {
        const {
            data: {
                token,
                user,
            },
        } = await api.post(
            'user/authenticate',
            { email, password },
        );

        localStorage.setItem('@goBarber:token', token);
        localStorage.setItem('@goBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@goBarber:token');
        localStorage.removeItem('@goBarber:user');
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ name: 'nelson', signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default { AuthProvider, useAuth };
