import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthLayout from '../_layout/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const { register, handleSubmit, getValues, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      history.push('/dashboard');
    } catch (error) {
      toast.error('Something went wrong. Please check your credentials');
    }
  };
  return (
    <AuthLayout>
      <img src={logo} alt="GoBarber" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Login</h2>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          icon={FiMail}
          ref={register}
          filled={getValues('email')}
          error={errors.email}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          icon={FiLock}
          ref={register}
          filled={getValues('email')}
          error={errors.password}
        />

        <Button type="submit">Login</Button>
      </form>

      <span>Don't have a account?</span>

      <Link to="/register">
        <FiLogIn />
        Register
      </Link>
    </AuthLayout>
  );
}

export default Login;
