import * as S from './styles';

function AuthLayout({ children }) {
  return (
    <S.Container>
      <S.Content>{children}</S.Content>
      <S.Background />
    </S.Container>
  );
}

export default AuthLayout;
