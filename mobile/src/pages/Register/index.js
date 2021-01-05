import React from 'react';
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

const Register = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

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
              name="user"
              icon="user"
              placeholder="User"
              control={control}
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              control={control}
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Password"
              control={control}
              secureTextEntry
            />

            <Button>Register</Button>
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
