import React, { useCallback, useRef } from 'react';
import {
    FiUser,
    FiLock,
    FiMail,
    FiArrowLeft,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../../components/input';
import Button from '../../../components/button';

import getvalidationErrors from '../../../utils/getvalidationErrors';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/Auth';
import { useToast } from '../../../context/Toast';
import getValidationErrors from '../../../utils/getvalidationErrors';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signUpClient } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: FormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signUpClient({
                name: data.name,
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
                title: 'Erro no cadastro',
                description: 'Verifique as credenciais.',
                type: 'error',
            });
        }
    }, [signUpClient]);

    return (
        <Container>

            <Background />

            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <h1>{'Cadastro de Cliente'}</h1>

                        <Input icon={FiUser} name="name" placeholder="Nome" />
                        <Input icon={FiMail} name="email" placeholder="Email" />
                        <Input icon={FiLock} name="password" placeholder="Senha" type="password" />

                        <Button type="submit">{'Cadastrar'}</Button>
                    </Form>

                    <Link to="login">
                        <FiArrowLeft />
                        {'Voltar para Login'}
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
