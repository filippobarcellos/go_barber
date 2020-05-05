import React, { useState, useCallback, useContext } from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { AuthContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const { signIn } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setErrors(null);

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Please type a valid email')
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        await signIn({
          email: formData.email,
          password: formData.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Something went wrong',
          description: 'Please check your email/password',
        });
      }
    },
    [formData, signIn, addToast]
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            placeholder="Email"
            icon={FiMail}
            onChange={(e) => handleChange(e)}
            error={errors && errors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={FiLock}
            onChange={(e) => handleChange(e)}
            error={errors && errors.password}
          />

          <Button type="submit">Login</Button>
          <a href="/forgot">Forgot you password?</a>
        </form>

        <a href="/login">
          <FiLogIn />
          Register
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
