import React from 'react';
import { View, Image } from 'react-native';
import logoImg from '../../assets/logo.png';

import * as S from './styles';

const Login = () => (
  <S.Container>
    <Image source={logoImg} />
    <S.Title>Login</S.Title>
  </S.Container>
);

export default Login;
