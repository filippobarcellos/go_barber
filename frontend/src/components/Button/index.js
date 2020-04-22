import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const Button = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
