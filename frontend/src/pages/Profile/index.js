import { useAuth } from '../../context/useAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../services/api';
import * as yup from 'yup';
import * as S from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Profile() {
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    errors,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      toast.error('Something went wrong. Please check your credentials');
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
                  user.avatar_url ||
                  `https://eu.ui-avatars.com/api/?name=${user.name}`
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
              type="old_password"
              name="password"
              placeholder="Current Password"
              icon={FiLock}
              ref={register}
              isDirty={isDirty}
              error={errors.old_password}
              containerStyle={{ marginTop: 24 }}
            />

            <Input
              type="password"
              name="password"
              placeholder="New Password"
              icon={FiLock}
              ref={register}
              isDirty={isDirty}
              error={errors.password}
            />

            <Input
              type="password"
              name="password_confirmation"
              placeholder="Confirm new password"
              icon={FiLock}
              ref={register}
              isDirty={isDirty}
              error={errors.password}
            />

            <Button type="submit">Update my Profile</Button>
          </S.Form>
        </S.Content>
      </S.Container>
    </>
  );
}

export default Profile;
