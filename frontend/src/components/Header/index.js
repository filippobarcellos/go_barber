import { useAuth } from '../../context/useAuth';
import { FiPower } from 'react-icons/fi';
import * as S from './styles';

import logo from '../../assets/logo.svg';

function Header() {
  const { logout, user } = useAuth();

  return (
    <S.Header>
      <S.Container>
        <img src={logo} alt="gobarber" />

        <S.Profile>
          <img
            src="https://avatars0.githubusercontent.com/u/56128203?s=460&u=9e5f0f57bd59aba31c947d38307cedb30e0f0ebe&v=4"
            alt="gobarber"
          />
          <div>
            <span>Welcome</span>
            <strong>{user.name}</strong>
          </div>
        </S.Profile>

        <button type="button" onClick={logout}>
          <FiPower />
        </button>
      </S.Container>
    </S.Header>
  );
}

export default Header;
