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
  font-size: 15px;
  color: #fff;
`;

export const AuthenticateButton = styled.TouchableOpacity`
  width: 90%;
  padding: 20px;
  font-size: 20px;
  background-color: #ff7a7d;
  margin: 10px;
  text-align: center;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
