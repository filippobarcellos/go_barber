import React from 'react';
import { Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';

import * as S from './styles';

const Input = ({ name, icon, control, ...rest }, ref) => {
  return (
    <S.Container>
      <Icon name={icon} size={20} color="#666360" />
      <Controller
        name={name}
        defaultValue=""
        control={control}
        render={({ onChange, value }) => (
          <S.Input
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardAppearance="dark"
            placeholderTextColor="#666360"
            {...rest}
          />
        )}
      />
    </S.Container>
  );
};

export default Input;
