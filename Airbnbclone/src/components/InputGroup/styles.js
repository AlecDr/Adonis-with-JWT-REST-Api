import styled from "styled-components/native";

export const InputContainer = styled.View`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
`;

export const InputLabel = styled.Text`
  color: #111;
  font-size: 14px;
  font-weight: bold;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  color: #444;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => (props.focused ? "#ff7a7d" : "#ccc")};
  border-radius: 4px;
  padding: 6px 12px;
`;
