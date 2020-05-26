import React, { useState, useCallback, useRef } from "react";

import { Container, Error } from "./styles";

function Input({ error, icon: Icon, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef(null);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <>
      <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          {...rest}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}

export default Input;
