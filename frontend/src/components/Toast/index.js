import React, { useContext } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastContext } from '../../context/ToastContext';

import { Container, Toast } from './styles';

const ToastContainer = () => {
  const { messages } = useContext(ToastContext);
  return (
    <Container>
      {messages &&
        messages.map((message) => (
          <Toast key={message.id} type={message.type}>
            <FiAlertCircle size={20} />

            <div>
              <strong>{message.title}</strong>
              <p>{message.description}</p>
            </div>

            <button type="button">
              <FiXCircle size={18} />
            </button>
          </Toast>
        ))}
    </Container>
  );
};
export default ToastContainer;
