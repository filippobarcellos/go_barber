import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyled } from './styles';

const Button = ({ children, ...rest }) => (
  <ButtonStyled type="button" {...rest}>
    {children}
  </ButtonStyled>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
