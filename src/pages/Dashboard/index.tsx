import React, {
    useCallback,
    useState,
} from 'react';

import DayPicker, {
    DayModifiers,
} from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    Calendar,
    NextAppointment,
    Section,
    Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { randomIcon } from '../../services/avatar';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../context/Auth';

const Dashboard: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const { user, signOut } = useAuth();

    const handleDateSelected = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {

            setSelectedDate(day);
        }
    }, []);
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

            <Content>
                <Schedule>
                    <h1>Horários Agendados</h1>
                    <p>
                        <span>{'Hoje'}</span>
                        <span>{'Dia 6'}</span>
                        <span>{'Segunda-feira'}</span>
                    </p>

                    <NextAppointment>
                        <strong>{'Atendimento a seguir'}</strong>
                        <div>
                            <img src={randomIcon()} alt="user icon" />
                            <strong>{'Client name'}</strong>

                            <span>
                                <FiClock />
                                {'08:00'}
                            </span>
                        </div>

                    </NextAppointment>

                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                {'08:00'}
                            </span>

                            <div>
                                <img src={randomIcon()} alt="user icon" />
                                <strong>{'Client name'}</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                {'08:00'}
                            </span>

                            <div>
                                <img src={randomIcon()} alt="user icon" />
                                <strong>{'Client name'}</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                {'08:00'}
                            </span>

                            <div>
                                <img src={randomIcon()} alt="user icon" />
                                <strong>{'Client name'}</strong>
                            </div>
                        </Appointment>
                    </Section>

                </Schedule>
                <Calendar>
                    <DayPicker
                        fromMonth={new Date()}
                        selectedDays={selectedDate}
                        disabledDays={[{ daysOfWeek: [0] }]}
                        modifiers={{
                            available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] }
                        }}
                        onDayClick={handleDateSelected}
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    );
}

export default Dashboard;
