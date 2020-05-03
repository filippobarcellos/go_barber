import React, { useState, useRef, useCallback } from 'react';

import { Container, Error } from './styles';

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
    <>
      <Container hasError={!!error} isFocused={isFocused} isFilled={isFilled}>
        {Icon && <Icon />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          {...rest}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default Input;
