import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import * as S from './styles';

const Input = ({ name, icon, ...rest }) => {
  return (
    <S.Container>
      <Icon name={icon} size={20} color="#666360" />

      <S.Input
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </S.Container>
  );
};

export default Input;
