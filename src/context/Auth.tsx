import React, { createContext, useCallback, useState, useContext } from "react";

import api from '../services/api';
import { createHash } from "crypto";

interface AuthState {
    token: string;
    user: object;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface ForgotPasswordCredentials {
    email: string;
}

interface ResetPasswordCredentials {
    token: string;
    password: string;
}

interface RegisterClientCredentials {
    name: string;
    email: string;
    password: string;
}

interface RegisterShopCredentials {
    name: string;
    barbershop: {
        name: string;
        address: string;
    }
    email: string;
    password: string;
}

interface AuthContextData {
    authState: AuthState;
    signIn(credentials: LoginCredentials): Promise<void>;
    signUpClient(credentials: RegisterClientCredentials): Promise<void>;
    signUpShop(credentials: RegisterShopCredentials): Promise<void>;
    signOut(): void;
    forgotPassword(credentials: ForgotPasswordCredentials): Promise<void>;
    resetPassword(credentials: ResetPasswordCredentials): Promise<void>;
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
    }: LoginCredentials): Promise<void> => {
        const {
            data: {
                token,
                user,
            },
        } = await api.post(
            'user/authenticate',
            {
                email,
                password: createHash('sha256').update(password).digest('hex'),
            },
        );

        localStorage.setItem('@goBarber:token', token);
        localStorage.setItem('@goBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signUpClient = useCallback(async ({
        name,
        email,
        password,
    }: RegisterClientCredentials): Promise<void> => {
        const {
            data: {
                token,
                user,
            },
        } = await api.post(
            'user/register',
            {
                name,
                email,
                password: createHash('sha256').update(password).digest('hex'),
            },
        );

        localStorage.setItem('@goBarber:token', token);
        localStorage.setItem('@goBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signUpShop = useCallback(async ({
        name,
        barbershop,
        email,
        password,
    }: RegisterShopCredentials): Promise<void> => {
        const {
            data: {
                token,
                user,
            },
        } = await api.post(
            'barbershop/register',
            {
                name,
                barbershop,
                email,
                password: createHash('sha256').update(password).digest('hex'),
            },
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

    const forgotPassword = useCallback(async ({
        email,
    }: ForgotPasswordCredentials): Promise<void> => {
        await api.post(
            'user/password/forgot',
            { email },
        );
    }, []);

    const resetPassword = useCallback(async ({
        token: resetToken,
        password,
    }: ResetPasswordCredentials): Promise<void> => {
        const {
            data: {
                token,
                user,
            },
        } = await api.post(
            'user/password/reset',
            {
                token: resetToken,
                newPassword: createHash('sha256').update(password).digest('hex'),
            },
        );

        localStorage.setItem('@goBarber:token', token);
        localStorage.setItem('@goBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authState: data,
                signIn,
                signOut,
                signUpClient,
                signUpShop,
                forgotPassword,
                resetPassword,
            }}
        >
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
