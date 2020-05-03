import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn = () => (
  <Container>
    <Content>
      <img src={logo} alt="GoBarber" />

      <form>
        <Input name="email" placeholder="Email" icon={FiMail} />
        <Input name="password" placeholder="Password" icon={FiLock} />

        <Button>Login</Button>
        <a href="/forgot">Forgot you password?</a>
      </form>

      <a href="/login">
        <FiLogIn />
        Register
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
