import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  background: #232129;
  padding: 0 16px;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 1px transparent;

  align-items: center;
  flex-direction: row;

  ${(props) =>
    props.onFocus &&
    css`
      border: 1px solid #ff9000;
    `}
`;

export const Input = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 18px;
`;
