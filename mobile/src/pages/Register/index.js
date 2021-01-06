import React, { useState, useRef } from 'react';
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
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import * as S from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigation = useNavigation();

  const handleSubmit = async (name, email, password) => {
    try {
      const data = { name, email, password };
      await schema.validate(data, { abortEarly: false });
      await api.post('/users', data);

      Alert.alert('You account was created. Please login.');

      navigation.navigate('Login');
    } catch (err) {
      Alert.alert(
        'Register Error',
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
              <S.Title>Create your Account</S.Title>
            </View>

            <Input
              autoCorrect={false}
              autoCapitalize="none"
              name="name"
              icon="user"
              placeholder="User Name"
              returnKeyType="next"
              onChangeText={(text) => setName(text)}
              onSubmitEditing={() => emailInputRef.current.focus()}
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              ref={emailInputRef}
              returnKeyType="next"
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Password"
              secureTextEntry
              ref={passwordInputRef}
              onChangeText={(text) => setPassword(text)}
            />

            <Button onPress={() => handleSubmit(name, email, password)}>
              Register
            </Button>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.ReturnLoginButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#ff9000" />
        <S.ReturnLoginText>Already have a account? Login</S.ReturnLoginText>
      </S.ReturnLoginButton>
    </>
  );
};

export default Register;
