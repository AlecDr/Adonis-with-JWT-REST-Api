import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// custom components
import {
  Container,
  Title,
  PhotosContainer,
  Image,
  ButtonText,
  CameraButton
} from "./styles";

export default class AddPropertyPicturesPage extends React.Component {
  state = {
    markerCoordinate: this.props.navigation.getParam("coordinate", "invalid")
  };

  renderPlaceholder = () => {
    let items = [];

    for (let i = 0; i < 6; i++) {
      items.push(
        <Image key={i} source={require("../../images/placeholder.png")} />
      );
    }

    return items;
  };

  render() {
    return (
      <Container>
        <Title>Lets take some pictures!</Title>
        <PhotosContainer
          bounces
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {this.renderPlaceholder()}
        </PhotosContainer>
        <CameraButton>
          <ButtonText>Take pictures</ButtonText>
          <Icon name="camera" size={30} color="#fff" />
        </CameraButton>
      </Container>
    );
  }
}
