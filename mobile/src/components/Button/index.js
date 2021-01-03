import React from 'react';

import * as S from './styles';

const Button = ({ children, ...rest }) => {
  return (
    <S.Container {...rest}>
      <S.Text>{children}</S.Text>
    </S.Container>
  );
};

export default Button;
