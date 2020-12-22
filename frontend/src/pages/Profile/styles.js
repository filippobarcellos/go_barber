import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    background: var(--darkGrey);

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: -176px auto 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 80px 0;
  width: 340px;

  h2 {
    margin-bottom: 24px;
    font-size: 20px;
    text-align: left;
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 32px;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    border: 0;
    background: var(--primary);
    cursor: pointer;
    right: 0;
    bottom: 0;
    transition: 0.2s background;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }

    input {
      display: none;
    }
  }

  svg {
    color: #312e38;
  }
`;
