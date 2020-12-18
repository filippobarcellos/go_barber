import * as S from './styles';

import Header from '../../components/Header';

function Dashboard() {
  return (
    <>
      <Header />
      <S.Main>
        <S.Schedule></S.Schedule>
      </S.Main>
    </>
  );
}

export default Dashboard;
