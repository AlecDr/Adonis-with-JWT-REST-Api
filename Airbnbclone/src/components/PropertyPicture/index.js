import React from "react";
import { Image, NormalImageContainer, TouchableImageContainer } from "./styles";

const PropertyPicture = props =>
  props.onPicturePressHandler ? (
    <TouchableImageContainer
      onPress={() => props.onPicturePressHandler(props.path)}
    >
      <Image source={{ uri: props.path }} />
    </TouchableImageContainer>
  ) : (
    <NormalImageContainer>
      <Image source={{ uri: props.path }} />
    </NormalImageContainer>
  );

export default PropertyPicture;
