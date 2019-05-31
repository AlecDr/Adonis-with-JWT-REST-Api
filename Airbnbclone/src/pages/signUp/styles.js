import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  padding: 12px;
`;

export const InputContainer = styled.View`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  color: #444;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
`;

export const InputLabel = styled.Text`
  color: #111;
  font-size: 14px;
  font-weight: bold;
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
