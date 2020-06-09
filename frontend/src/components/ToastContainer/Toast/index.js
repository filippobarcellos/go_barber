import React, { useContext, useEffect } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { StyledToast } from './styles';

import { ToastContext } from '../../../context/ToastContext';

const Toast = ({ message, style }) => {
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <StyledToast key={message.id} type={message.type} style={style}>
      <FiAlertCircle size={20} />

      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </StyledToast>
  );
};

export default Toast;
