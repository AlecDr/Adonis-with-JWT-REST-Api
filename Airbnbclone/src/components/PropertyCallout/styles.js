import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 4px;
  height: 70px;
  width: 130px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
`;

export const TitleText = styled.Text`
  color: #222;
  font-size: 14px;
  font-weight: bold;
`;

export const DetailsButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #880e4f;
  padding: 4px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const DetailsButtonText = styled.Text`
  color: #eee;
  font-size: 10px;
  font-weight: lighter;
`;
