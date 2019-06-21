import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const MapContainer = styled.View`
  flex: 1;
`;

export const LoadingLocationContainer = styled.View`
  padding: 1px;
  z-index: 100;
`;

export const BottomMapContainer = styled.View`
  position: absolute;
  z-index: 100;
  bottom: 10;
  padding: 0px 10px;
  margin: 0;
  width: 100%;
  align-items: center;
  flex-direction: row;
`;
