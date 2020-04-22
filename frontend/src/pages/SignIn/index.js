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
        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Login</Button>

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
