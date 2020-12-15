import React from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import AuthLayout from '../_layout/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

const SignUp = () => (
  <AuthLayout>
    <img src={logo} alt="Go Barber" />

    <form>
      <h1>Register</h1>
      <Input type="text" name="name" icon={FiUser} placeholder="Name" />

      <Input type="text" name="email" icon={FiMail} placeholder="E-mail" />

      <Input
        type="password"
        name="password"
        icon={FiLock}
        placeholder="Password"
      />

      <Button type="submit">Register</Button>
    </form>

    <Link to="/">
      <FiUser />
      Already have a account?
    </Link>
  </AuthLayout>
);

export default SignUp;
