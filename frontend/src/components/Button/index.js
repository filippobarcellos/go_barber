import React from "react";

import { ButtonStyled } from "./styles.js";

function Button({ children, ...rest }) {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
}

export default Button;
