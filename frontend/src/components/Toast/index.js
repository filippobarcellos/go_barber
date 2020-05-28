import React from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";

import { Container, Toast } from "./styles";

const ToastContainer = () => (
  <Container>
    <Toast type="error">
      <FiAlertCircle size={20} />

      <div>
        <strong>Aconteceu um erro</strong>
        <p>Nao foi possivel fazer login</p>
      </div>

      <button type="button">
        <FiXCircle size={18} />
      </button>
    </Toast>
  </Container>
);

export default ToastContainer;
