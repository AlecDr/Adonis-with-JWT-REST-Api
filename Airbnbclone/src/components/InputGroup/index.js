import React, { useState } from "react";
import { TextInput, InputContainer, InputLabel } from "./styles";

const InputGroup = props => {
  const [focused, setFocused] = useState(false);

  return (
    <InputContainer>
      <InputLabel>{props.label}</InputLabel>
      <TextInput
        focused={focused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={props.onChangeText}
        value={props.value}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType ? props.keyboardType : "default"}
      />
    </InputContainer>
  );
};

export default InputGroup;
