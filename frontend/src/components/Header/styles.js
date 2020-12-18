import styled from 'styled-components';

export const Header = styled.header`
  padding: 32px 0;
  background: var(--darkGrey);
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 1120px;
  margin: 0 auto;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: var(--text);
    }

    strong {
      color: var(--primary);
      font-weight: 500;
    }
  }
`;
