import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
// import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import AuthLayout from '../_layout/Auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

// import { AuthContext } from '../../context/AuthContext';
// import { ToastContext } from '../../context/ToastContext';

function SignIn() {
  const history = useHistory();

  return (
    <AuthLayout>
      <img src={logo} alt="Go Barber" />

      <form>
        <h1>Login</h1>
        <Input type="email" name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Password"
        />

        <Button type="submit">Login</Button>

        <Link to="/register">Forgot my password</Link>
      </form>

      <Link to="/register">
        <FiLogIn />
        Create your account
      </Link>
    </AuthLayout>
  );
}

export default SignIn;
