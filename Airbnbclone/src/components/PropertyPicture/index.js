import React from "react";
import { Image } from "./styles";

const PropertyPicture = props => <Image source={{ uri: props.path }} />;

export default PropertyPicture;
