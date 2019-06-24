import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  padding: 12px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const Button = styled.TouchableOpacity`
  width: 90%;
  padding: 16px;
  background-color: #ff7a7d;
  margin: 10px;
  border-radius: 6px;
  align-items: center;
`;

export const MessagesContainer = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 16px;
`;

export const SuccessText = styled.Text`
  font-size: 16px;
  color: green;
`;
