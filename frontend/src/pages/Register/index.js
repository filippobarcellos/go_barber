import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiLogIn, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';

import * as yup from 'yup';
import * as S from './styles';

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
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    errors,
  } = useForm({
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

      toast.error('User has been created. Please Login');

      history.push('/');
    } catch (error) {
      toast.error('Something went wrong. Please check your credentials');
    }
  };
  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt="GoBarber" />

        <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2>Register</h2>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            icon={FiUser}
            ref={register}
            isDirty={isDirty}
            error={errors.email}
          />

          <Input
            type="text"
            name="email"
            placeholder="Email"
            icon={FiMail}
            ref={register}
            isDirty={isDirty}
            error={errors.email}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            icon={FiLock}
            ref={register}
            isDirty={isDirty}
            error={errors.password}
          />

          <Button type="submit">Register</Button>
        </S.Form>

        <Link to="/">
          <FiLogIn />
          Login
        </Link>
      </S.Content>
      <S.Background />
    </S.Container>
  );
}

export default Register;
