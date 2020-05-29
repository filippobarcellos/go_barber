import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { signIn } from '../../store/Auth/authSlice';

import { Container, Content, Background } from './styles';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const { email, password } = formData;

  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setErrors(null);

        const signInSchema = Yup.object().shape({
          email: Yup.string()
            .email('Email is not a valid email')
            .required('Email is required'),
          password: Yup.string().min(
            4,
            'Password must be at least 4 carachaters'
          ),
        });

        await signInSchema.validate(formData, { abortEarly: false });

        dispatch(signIn({ email, password }));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          setErrors(error);
        }
      }
    },
    [formData]
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber" />

        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input
            type="email"
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            onChange={handleChange}
            error={errors && errors.email}
          />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Password"
            onChange={handleChange}
            error={errors && errors.password}
          />

          <Button type="submit">Login</Button>

          <a href="/">Forgot my password</a>
        </form>

        <a href="">
          <FiLogIn />
          Create your account
        </a>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
