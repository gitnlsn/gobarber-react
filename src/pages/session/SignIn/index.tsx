import React, { useCallback, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../../context/Auth';

import Input from '../../../components/input';
import Button from '../../../components/button';
import getValidationErrors from '../../../utils/getvalidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../../assets/logo.svg';
import { useToast } from '../../../context/Toast';
import { Link } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: FormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error));
                console.log(error);
                return;
            }
            addToast({
                title: 'Erro na autenticação',
                description: 'Verifique as credenciais.',
                type: 'error',
            });
        }
    }, [signIn]);

    return (
        <Container>
            <Content>
                <AnimationContainer>

                    <img src={logoImg} alt="GoBarber" />

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <h1>{'Login'}</h1>

                        <Input icon={FiMail} name="email" placeholder="Email" />
                        <Input icon={FiLock} name="password" placeholder="Senha" type="password" />

                        <Button type="submit">{'Entrar'}</Button>

                        <Link to="forgot-password">{'Esqueci a minha senha'}</Link>
                    </Form>

                    <Link to="register">
                        <FiLogIn />
                        {'Criar Conta'}
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />

        </Container>
    );
};

export default SignIn;
