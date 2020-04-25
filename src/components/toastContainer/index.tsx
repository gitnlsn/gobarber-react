import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './toast';

import { ToastMessage } from '../../context/Toast';
import { Container } from './styles';

interface ToastContainerProps {
    messageList: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    messageList,
}) => {

    const messageWithTransitions = useTransition(
        messageList,
        (message) => message.id,
        {
            from: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' },
            enter: { right: '0%', opacity: 1, transform: 'rotateX(360deg)' },
            leave: { right: '-120%', opacity: 0, transform: 'rotateX(0deg)' },
        },
    );

    return (
        <Container>
            {messageWithTransitions.map(({ key, item, props }) => (
                <Toast
                    key={key}
                    toast={item}
                    style={props}
                />
            ))}
        </Container>
    );
}

export default ToastContainer;
