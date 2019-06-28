import styled from "styled-components/native";

export const Container = styled.View`
  align-self: center;
  width: 95%;
  height: 400px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: #9a0007;
  width: 45%;
  padding: 10px 5px;
  border-radius: 10px;
  text-align: center;
`;

export const CancelButtonText = styled.Text`
  font-size: 14px;
  align-self: center;
  color: white;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: #00600f;
  width: 45%;
  padding: 10px 5px;
  border-radius: 10px;
  text-align: center;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 14px;
  align-self: center;
  color: white;
`;

export const ModalText = styled.Text`
  font-size: 24px;
  color: #222;
  align-self: center;
`;
