import React, { useRef, useState } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useAuth } from '../../context/useAuth';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import * as S from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef();
  const navigation = useNavigation();
  const { login, user } = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const onSubmit = async (email, password) => {
    try {
      const data = { email, password };
      await schema.validate(data, { abortEarly: false });

      await login({ email, password });
    } catch (err) {
      console.log(err.message);
      Alert.alert(
        'Login error',
        'Something is wrong. Please check your credentials.'
      );
    }
  };

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
              value={email}
              icon="mail"
              placeholder="E-mail"
              onChangeText={(text) => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Password"
              returnKeyType="send"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />

            <Button onPress={() => onSubmit(email, password)}>Login</Button>
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
