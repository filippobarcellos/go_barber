import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { signIn } from '../../store/Auth/actions';

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

  const { email, password } = formData;
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

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
          password: Yup.string().min(
            6,
            'Password must be at least 6 characters'
          ),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        dispatch(signIn(email, password));
      } catch (err) {
        const errors = getValidationErrors(err);
        setErrors(errors);
      }
    },
    [formData, dispatch]
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
