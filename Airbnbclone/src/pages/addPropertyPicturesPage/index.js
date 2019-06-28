import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";
import PictureList from "../../components/PictureList";
import ImageRemoverModal from "../../components/ImageRemoverModal";
import { FloatingAction } from "react-native-floating-action";
import Modal from "react-native-modal";

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
    modalVisible: false,
    pictures: [],
    selectedPicture: null
  };

  handleImagePress = uri => {
    this.setState({ selectedPicture: uri, modalVisible: true });
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

  navigateToPropertyDetailsPage = () => {
    this.props.navigation.navigate("AddPropertyDetailsPage", {
      coordinate: this.state.markerCoordinate,
      pictures: this.state.pictures
    });
  };

  handleFabItemPress = name => {
    switch (name) {
      case "btn_property_info":
        this.navigateToPropertyDetailsPage();
        break;
    }
  };

  navigateToAddPropertyPage = () => {
    this.props.navigation.navigate("AddPropertyPicturesPage", {
      coordinate: this.state.markerPosition
    });
  };

  renderFabs = () => {
    const actions = [
      {
        text: "Next",
        icon: (
          <Icon size={20} name="playlist-edit" style={{ color: "white" }} />
        ),
        name: "btn_property_info",
        color: "#880e4f",
        position: 1
      }
    ];

    return (
      <FloatingAction
        color="#880e4f"
        onPressItem={this.handleFabItemPress}
        actions={actions}
      />
    );
  };

  closeModalHandler = () => {
    this.setState({ modalVisible: false, selectedPicture: null });
  };

  removePictureHandler = () => {
    let pictures = [...this.state.pictures];

    pictures = pictures.filter(
      picture => picture !== this.state.selectedPicture
    );

    this.setState({ pictures, selectedPicture: null, modalVisible: false });
  };

  render() {
    return (
      <Container>
        <Modal
          onBackButtonPress={this.closeModalHandler}
          onBackdropPress={this.closeModalHandler}
          useNativeDriver
          isVisible={this.state.modalVisible}
        >
          <ImageRemoverModal
            path={this.state.selectedPicture}
            onCancelHandler={this.closeModalHandler}
            onConfirmHandler={this.removePictureHandler}
          />
        </Modal>
        <Title>Lets take some pictures!</Title>
        <PictureList
          onPressHandler={this.handleImagePress}
          pictures={this.state.pictures}
        />
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

        {this.renderFabs()}
      </Container>
    );
  }
}
