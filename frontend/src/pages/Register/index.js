import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiLogIn, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import * as yup from 'yup';

import AuthLayout from '../_layout/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Register() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post('users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success('User has been created. Please Login');

      history.push('/');
    } catch (error) {
      toast.error('Something went wrong. Please check your credentials');
    }
  };

  return (
    <AuthLayout>
      <img src={logo} alt="GoBarber" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>Register</h2>

        <Input
          type="text"
          name="name"
          placeholder="Name"
          icon={FiUser}
          ref={register}
          error={errors.email}
        />

        <Input
          type="text"
          name="email"
          placeholder="Email"
          icon={FiMail}
          ref={register}
          error={errors.email}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          icon={FiLock}
          ref={register}
          error={errors.password}
        />

        <Button type="submit">Register</Button>
      </form>

      <Link to="/">
        <FiLogIn />
        Login
      </Link>
    </AuthLayout>
  );
}

export default Register;
