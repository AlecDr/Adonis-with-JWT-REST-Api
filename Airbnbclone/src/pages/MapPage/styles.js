import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const FindMeButton = styled.TouchableOpacity`
  width: 60;
  height: 60;
  border-radius: 50;
  background-color: #880e4f;
  position: relative;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const LoadingLocationContainer = styled.View`
  padding: 1px;
  z-index: 100;
`;

export const BottomMapContainer = styled.View`
  position: absolute;
  bottom: 10;
  padding: 0px 20px;
  margin: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
