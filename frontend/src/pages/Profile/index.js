import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/useAuth';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import * as yup from 'yup';
import * as S from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().when('password_confirmation', {
    is: (val) => !!val.length,
    then: yup.string().required(),
    otherwise: yup.string(),
  }),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match.'),
});

function Profile() {
  const { user, updateUser } = useAuth();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async ({ name, email, password, password_confirmation }) => {
    const formData = Object.assign(
      {
        name,
        email,
      },
      password
        ? {
            password,
            password_confirmation,
          }
        : {}
    );

    try {
      const response = await api.put('/users', formData);
      updateUser(response.data);
      toast.success('User has been updated.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleAvatarChange = async (e) => {
    const data = new FormData();

    data.append('avatar', e.target.files[0]);

    const response = await api.patch('users/avatar', data);

    toast.success('Avatar has been updated');

    updateUser(response.data);
  };

  return (
    <>
      <S.Container>
        <header>
          <div>
            <Link to="/dashboard">
              <FiArrowLeft size={20} />
            </Link>
          </div>
        </header>
        <S.Content>
          <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <S.AvatarInput>
              <img
                src={
                  user.avatar
                    ? `http://localhost:3333/files/${user.avatar}`
                    : `https://eu.ui-avatars.com/api/?name=${user.name}`
                }
                alt={user.name}
              />
              <label htmlFor="avatar">
                <FiCamera size={20} />
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleAvatarChange}
                />
              </label>
            </S.AvatarInput>

            <h2>Profile</h2>

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
              placeholder="New Password"
              icon={FiLock}
              ref={register}
              error={errors.password}
              containerStyle={{ marginTop: 24 }}
            />

            <Input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              icon={FiLock}
              ref={register}
              error={errors.password_confirmation}
            />

            <Button type="submit">Update my Profile</Button>
          </S.Form>
        </S.Content>
      </S.Container>
    </>
  );
}

export default Profile;
