import styled from 'styled-components';
import { shade } from 'polished';

export const Button = styled.button`
  background: var(--primary);
  padding: 16px 0;
  border: none;
  border-radius: 10px;
  margin-top: 24px;
  font-weight: 600;
  transition: .2s background;

  &:hover {
    background: ${shade(0.2, '#FF9000')}
  }
`