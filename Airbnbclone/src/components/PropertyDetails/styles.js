import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex-direction: column;
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

export const ImagesContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;

export const SubTitleText = styled.Text`
  font-size: 20px;
  color: #111;
  text-align: left;
  margin: 10px 20px;
  font-weight: bold;
`;

export const LabelText = styled.Text`
  font-size: 16px;
  color: #222;
  text-align: left;
  margin: 2px 20px;
  font-weight: bold;
`;

export const DetailText = styled.Text`
  font-size: 12px;
  color: #333;
  text-align: left;
  margin: 2px 20px;
`;

export const PropertyDetailsContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;

export const PropertyLocationContainer = styled.View`
  width: 100%;
  height: 200px;
  flex-direction: column;
`;
