import React from 'react';
import { View, Image } from 'react-native';
import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import * as S from './styles';

const Login = () => (
  <S.Container>
    <Image source={logoImg} />
    <S.Title>Login</S.Title>

    <Input name="email" icon="mail" placeholder="E-mail" />
    <Input name="password" icon="lock" placeholder="Password" />
    <Button>Login</Button>
  </S.Container>
);

export default Login;
