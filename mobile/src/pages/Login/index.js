import React, { useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import * as S from './styles';

const Login = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const passwordInputRef = useRef(null);
  const emailInputref = useRef(null);

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <S.Container>
            <Image source={logoImg} />

            <View>
              <S.Title>Login</S.Title>
            </View>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              control={control}
              returnKeyType="next"
            />

            <Input
              name="password"
              icon="lock"
              placeholder="Password"
              control={control}
              secureTextEntry
            />
            <Button onPress={handleSubmit(onSubmit)}>Login</Button>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccountButton onPress={() => navigation.navigate('Register')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountText>
          Don't have a account? Register
        </S.CreateAccountText>
      </S.CreateAccountButton>
    </>
  );
};

export default Login;
