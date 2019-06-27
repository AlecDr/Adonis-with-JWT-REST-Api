import React from "react";
import { Image, ImageContainer } from "./styles";

const PropertyPicture = props => (
  <ImageContainer onPress={() => props.onPicturePressHandler(props.path)}>
    <Image source={{ uri: props.path }} />
  </ImageContainer>
);

export default PropertyPicture;
