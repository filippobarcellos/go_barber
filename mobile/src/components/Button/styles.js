import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  background: #ff9000;
  height: 60px;
  border-radius: 10px;
  margin-top: 16px;

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
