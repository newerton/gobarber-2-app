import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 0 : 40}px;
  padding-top: ${Platform.OS === 'ios'
    ? `${getStatusBarHeight() + 24}px`
    : '40px'};
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 20px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 0;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const UserAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 98px;
  align-self: center;
`;
