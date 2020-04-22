import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
    children,
    ...props
}) => (
    <Container>
        <button type="button" {...props}>{children}</button>
    </Container>
);

export default Button;
