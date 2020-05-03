import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #232129;
  border-radius: 8px;
  padding: 16px;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}


  & + div {
    margin-top: 8px;
  }

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

export const Error = styled.span`
  font-size: 12px;
  color: #c53030;
  margin-top: 8px;
  margin-bottom: 8px;
`;
