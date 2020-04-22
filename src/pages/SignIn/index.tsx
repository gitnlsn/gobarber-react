import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErrors from '../../utils/getvalidationErrors';
import { FormHandles } from '@unform/core';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
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
        } catch (error) {
            formRef.current?.setErrors(getValidationErrors(error));
            console.log(error);
        }
    }, []);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <h1>Faça seu Logon</h1>

                    <Input icon={FiMail} name="email" placeholder="Email" />
                    <Input icon={FiLock} name="password" placeholder="Senha" type="password" />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci a minha senha</a>
                </Form>

                <a href="register">
                    <FiLogIn />
                    Criar Conta
                </a>
            </Content>

            <Background />

        </Container>
    );
};

export default SignIn;
