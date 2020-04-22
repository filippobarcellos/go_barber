import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #232129;
  border-radius: 8px;
  border: 2px solid #232129;
  padding: 16px;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;
  }

  svg {
    margin-right: 16px;
  }
`;
