import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";

// custom components
import {
  Container,
  Title,
  PhotosContainer,
  Image,
  ButtonText,
  ButtonsContainer,
  Button
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

  handlePictureButtonPress = async () => {
    try {
      const images = await ImagePicker.openCamera({
        width: 400,
        height: 400
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleAlbumButtonPress = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        width: 400,
        height: 400
      });
    } catch (error) {
      console.log(error);
    }
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
        <ButtonsContainer>
          <Button onPress={this.handlePictureButtonPress}>
            <ButtonText>Take picture</ButtonText>
            <Icon name="camera" size={20} color="#fff" />
          </Button>

          <Button onPress={this.handleAlbumButtonPress}>
            <ButtonText>Open Album</ButtonText>
            <Icon name="album" size={20} color="#fff" />
          </Button>
        </ButtonsContainer>
      </Container>
    );
  }
}
