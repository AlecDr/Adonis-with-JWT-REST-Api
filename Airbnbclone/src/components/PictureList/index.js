import React from "react";
import { PhotosContainer } from "./styles";

// custom components
import PlaceholderPicture from "../PlaceholderPicture";
import PropertyPicture from "../PropertyPicture";

const PictureList = props => {
  return props.pictures.length > 0 ? (
    <PhotosContainer
      bounces
      contentContainerStyle={{ paddingRight: 20 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {props.pictures.map((picture, index) => (
        <PropertyPicture key={index} path={picture} />
      ))}
    </PhotosContainer>
  ) : (
    <PhotosContainer
      contentContainerStyle={{ paddingRight: 20 }}
      bounces
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {[1, 2, 3, 4, 5, 6].map(index => (
        <PlaceholderPicture key={index} />
      ))}
    </PhotosContainer>
  );
};
export default PictureList;
