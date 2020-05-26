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
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { forgotPassword } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: FormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await forgotPassword({
                email: data.email,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error));
                console.log(error);
                return;
            }
            addToast({
                title: 'Erro ao solicitar alteração de senha.',
                description: 'Verifique as credenciais.',
                type: 'error',
            });
        }
    }, [forgotPassword]);

    return (
        <Container>
            <Content>
                <AnimationContainer>

                    <img src={logoImg} alt="GoBarber" />

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <h1>{'Esqueci a Senha'}</h1>

                        <Input icon={FiMail} name="email" placeholder="Email" />

                        <Button type="submit">{'Enviar'}</Button>

                        <a href="login">{'Fazer o login'}</a>
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

export default ForgotPassword;
