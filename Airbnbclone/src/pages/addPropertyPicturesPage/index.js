import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";
import PictureList from "../../components/PictureList";

// custom components
import {
  Container,
  Title,
  ButtonText,
  ButtonsContainer,
  Button
} from "./styles";

export default class AddPropertyPicturesPage extends React.Component {
  state = {
    markerCoordinate: this.props.navigation.getParam("coordinate", "invalid"),
    pictures: []
  };

  handlePictureButtonPress = async () => {
    try {
      const picture = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true
      });

      this.setState(oldState => {
        newPictures = [...oldState.pictures];
        newPictures.push(picture.path);

        return { ...oldState, pictures: newPictures };
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleAlbumButtonPress = async () => {
    try {
      const pictures = await ImagePicker.openPicker({
        multiple: true,
        width: 400,
        height: 400
      });

      if (pictures.length) {
        pictures.map(picture =>
          this.setState(oldState => {
            newPictures = [...oldState.pictures];
            newPictures.push(picture.path);

            return { ...oldState, pictures: newPictures };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <Title>Lets take some pictures!</Title>
        <PictureList pictures={this.state.pictures} />
        <ButtonsContainer>
          <Button onPress={this.handlePictureButtonPress}>
            <ButtonText>Take picture</ButtonText>
            <Icon name="camera" size={20} color="#fff" />
          </Button>

          <Button onPress={this.handleAlbumButtonPress}>
            <ButtonText>Open Album</ButtonText>
            <Icon name="image-album" size={20} color="#fff" />
          </Button>
        </ButtonsContainer>
      </Container>
    );
  }
}
