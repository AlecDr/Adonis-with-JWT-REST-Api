import React from "react";
import { PhotosContainer, Image } from "./styles";

const PictureList = props => {
  return props.pictures.length > 0 ? null : (
    <PhotosContainer bounces horizontal showsHorizontalScrollIndicator={false}>
      {[1, 2, 3, 4, 5, 6].map(index => (
        <Image key={index} source={require("../../images/placeholder.png")} />
      ))}
    </PhotosContainer>
  );
};
export default PictureList;
