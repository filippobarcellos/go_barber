import styled from 'styled-components';
import { shade } from 'polished';

export const ButtonStyled = styled.button`
  height: 56px;
  padding: 0 16px;
  margin-top: 16px;
  background: #ff9000;
  border: 0;
  border-radius: 8px;
  color: #312e38;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
