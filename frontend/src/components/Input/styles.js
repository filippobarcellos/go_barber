import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  border: 2px solid var(--grey);
  padding: 16px;
  width: 100%;
  border-radius: 10px;
  height: 56px;
  background: var(--grey);
  display: flex;
  align-items: center;
  color: var(--placeholder);

  svg {
    margin-right: 16px;
  }

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      border-color: var(--primary);
      color: var(--primary);
    `}

  ${(props) =>
    props.error &&
    css`
      border-color: var(--error);
      color: var(--error);
    `}
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text);

  &::placeholder {
    color: var(--placeholder);
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
    cursor: pointer;
  }
`;
