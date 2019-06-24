import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  padding: 12px;
`;

export const HeaderContainer = styled.View`
  width: 95%;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 5px 0px 20px 0px;
`;

export const TitleText = styled.Text`
  font-size: 25px;
  color: #111;
  text-align: center;
  margin-right: 2px;
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
