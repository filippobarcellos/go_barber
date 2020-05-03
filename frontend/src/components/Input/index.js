import React, { useState, useRef, useCallback } from 'react';

import { Container } from './styles';

const Input = ({ icon: Icon, error, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
      {error}
    </Container>
  );
};

export default Input;
