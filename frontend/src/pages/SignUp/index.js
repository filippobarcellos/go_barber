import React, { useState, useCallback } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setErrors(null);

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
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
      } catch (err) {
        const errors = getValidationErrors(err);
        setErrors(errors);
      }
    },
    [formData]
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />

        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            icon={FiUser}
            type="text"
            placeholder="Name"
            onChange={(e) => handleChange(e)}
            error={errors && errors.name}
          />
          <Input
            name="email"
            icon={FiMail}
            type="text"
            placeholder="E-mail"
            onChange={(e) => handleChange(e)}
            error={errors && errors.email}
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            error={errors && errors.password}
          />

          <Button type="submit">Register</Button>
        </form>

        <a href="/login">
          <FiArrowLeft />
          Go back to Login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
