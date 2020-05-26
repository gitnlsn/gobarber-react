import React from 'react';

import {
    Container,
    Header,
    HeaderContent,
    Profile,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { randomIcon } from '../../services/avatar';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../context/Auth';

const Dashboard: React.FC = () => {

    const { user, signOut } =  useAuth();
    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber Logo" />

                    <Profile>
                        <img src={randomIcon()} alt="User Avatar" />

                        <div>
                            <span>{'Bem vindo,'}</span>
                            <strong>{user.name}</strong>
                        </div>

                    </Profile>
                    <button
                        type="button"
                        onClick={() => signOut()}
                    >
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        </Container>
    );
}

export default Dashboard;
