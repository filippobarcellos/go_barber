import styled from 'styled-components';
import { shade } from 'polished';
import background from '../../../assets/background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 800px;

  > a {
    display: flex;
    align-items: center;
    color: var(--primary);
    margin-top: 8px;
    transition: 0.2s color;

    &:hover {
      color: ${shade(0.2, '#FF9000')};
    }

    svg {
      margin-right: 6px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 80px 0;
    width: 340px;

    h2 {
      margin-bottom: 24px;
    }

    a {
      margin-top: 24px;
      display: block;
      color: var(--text);
      transition: 0.2 color;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
`;
