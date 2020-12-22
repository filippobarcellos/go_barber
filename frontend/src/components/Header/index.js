import { Link } from 'react-router-dom';
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
            src={
              user.avatar_url ||
              `https://eu.ui-avatars.com/api/?name=${user.name}`
            }
            alt={user.name}
          />
          <div>
            <span>Welcome</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
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
