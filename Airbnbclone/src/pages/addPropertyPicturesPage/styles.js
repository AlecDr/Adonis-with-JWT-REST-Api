import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.Text`
  padding: 20px;

  font-size: 25px;
  color: #222;
  align-self: center;
`;

export const PhotosContainer = styled.ScrollView`
  width: 90%;
  max-height: 210px;
  padding: 10px;
  border: 1px solid #888;
  border-radius: 20px;
  flex-direction: row;
  align-self: center;
  margin: 10px 0;
`;

export const Image = styled.Image`
  margin: 5px 15px;
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 10px;
`;

export const CameraButton = styled.TouchableOpacity`
  width: 90%;
  padding: 16px;
  background-color: #ff7a7d;
  margin: 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  align-self: center;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: #fff;
  flex: 3;
`;
