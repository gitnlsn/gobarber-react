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
import { Link, useLocation, useHistory } from 'react-router-dom';

interface FormData {
    token: string;
    newPassword: string;
    passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { resetPassword } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const resetToken = new URLSearchParams(useLocation().search).get('token') || undefined;

    const handleSubmit = useCallback(async (data: FormData) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                token: Yup.string().required('Token de recuperação de senha está faltando.'),
                newPassword: Yup.string().min(6, 'No mínimo 6 digitos'),
                passwordConfirmation: Yup.string().oneOf(
                    [Yup.ref('newPassword')],
                    'Confirme a senha'
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await resetPassword({
                token: data.token,
                password: data.newPassword,
            });

            history.push('/');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error));
                console.log(error);
                return;
            }
            addToast({
                title: 'Erro ao alterar a senha',
                description: 'Verifique as credenciais.',
                type: 'error',
            });
        }
    }, [resetPassword]);

    return (
        <Container>
            <Content>
                <AnimationContainer>

                    <img src={logoImg} alt="GoBarber" />

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <h1>{'Alteração de Senha'}</h1>

                        <Input
                            icon={FiLock}
                            name="newPassword"
                            placeholder="Nova Senha"
                            type="password"
                        />

                        <Input
                            icon={FiLock}
                            name="passwordConfirmation"
                            placeholder="Confirmação de Senha"
                            type="password"
                        />

                        <Input
                            icon={FiLock}
                            name="token"
                            placeholder="Token de Recuperação de Senha"
                            type="password"
                            defaultValue={resetToken}
                            hidden={true}
                        />

                        <Button type="submit">{'Enviar'}</Button>

                        <Link to="login">{'Fazer o login'}</Link>
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

export default ResetPassword;
