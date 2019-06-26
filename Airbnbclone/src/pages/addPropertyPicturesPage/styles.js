import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.Text`
  padding: 20px 0px 5px 0px;
  font-size: 25px;
  color: #222;
  align-self: center;
`;

export const ButtonsContainer = styled.View`
  width: 95%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  background-color: #ff7a7d;
  margin: 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  flex: 3;
`;
