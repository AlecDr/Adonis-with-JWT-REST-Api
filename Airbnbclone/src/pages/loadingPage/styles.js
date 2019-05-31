import styled from "styled-components/native";

export const MainContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
`;

export const Text = styled.Text`
  font-size: 25px;
  color: #aaa;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const AuthenticateButton = styled.TouchableOpacity`
  width: 90%;
  padding: 16px;
  background-color: #ff7a7d;
  margin: 10px;
  border-radius: 6px;
  align-items: center;
`;
