import React, { createContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/Toast';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addToast = useCallback(
    ({ type, title, description }) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages({ ...messages, toast });
    },
    [messages]
  );

  const removeToast = useCallback(() => {}, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};
