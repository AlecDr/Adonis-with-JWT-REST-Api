import React from "react";
import api from "../../services/api";
import Emoji from "react-native-emoji";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import MapView, { Marker } from "react-native-maps";

import { AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import PictureList from "../../components/PictureList";
import {
  Button,
  ButtonText,
  Container,
  HeaderContainer,
  TitleText,
  MessagesContainer,
  ErrorText,
  SuccessText,
  ImagesContainer,
  SubTitleText,
  PropertyDetailsContainer,
  LabelText,
  DetailText,
  PropertyLocationContainer
} from "./styles";

export default class AddPropertySubmitPage extends React.Component {
  state = {
    property: this.props.navigation.getParam("property", null),
    success: "",
    error: "",
    loading: false,
    userToken: null,
    submitted: false,
    flex: 0
  };

  componentWillMount() {
    this.fetchUserToken();
  }

  fetchUserToken = async () => {
    const token = await AsyncStorage.getItem("user_token");
    this.setState({ userToken: token });
  };

  renderButtonOrSpinner = () => {
    return this.state.loading ? (
      <LoadingIcon />
    ) : !this.state.submitted ? (
      <Button onPress={this.handleAddProperty}>
        <ButtonText>Add Property</ButtonText>
      </Button>
    ) : null;
  };

  renderMessages = () => {
    return (
      <MessagesContainer>
        {this.state.error ? <ErrorText>{this.state.error}</ErrorText> : null}
        {this.state.success ? (
          <SuccessText>{this.state.success}</SuccessText>
        ) : null}
      </MessagesContainer>
    );
  };

  handleAddProperty = async () => {
    try {
      const { title, price, address } = this.state.property;
      const { latitude, longitude } = this.state.property.coordinate;

      this.setState({ loading: true });

      const response = await api.post("/properties", {
        title,
        price,
        address,
        latitude,
        longitude,
        token: this.state.userToken
      });

      const id = response.data.property.id;

      if (this.state.property.pictures.length) {
        const data = new FormData();
        data.append("token", this.state.userToken);

        this.state.property.pictures.map((picture, index) => {
          let random = Math.floor(Math.random() * 1000000) + 1;
          data.append(`image`, {
            name: `${random}${id}${index}.jpg`,
            type: "image/jpeg",
            uri: picture
          });
        });

        const imagesResponse = await api.post(
          `/properties/${id}/images/store`,
          data
        );
      }

      this.setState({
        loading: false,
        success:
          "Property created successfully! Going back to the main page...",
        submitted: true
      });

      setTimeout(() => {
        this.props.navigation.popToTop();
      }, 1000);
    } catch (error) {
      this.setState({ loading: false, error: JSON.stringify(error) });
    }
  };

  renderPropertyInfo = () => {
    return (
      <PropertyDetailsContainer>
        <SubTitleText>Details</SubTitleText>
        <LabelText>Title</LabelText>
        <DetailText>{this.state.property.title}</DetailText>
        <LabelText>Address</LabelText>
        <DetailText>{this.state.property.address}</DetailText>
        <LabelText>Price</LabelText>
        <DetailText>$ {this.state.property.price}</DetailText>
      </PropertyDetailsContainer>
    );
  };

  renderPropertyLocation = () => {
    return (
      <PropertyLocationContainer>
        <SubTitleText>Property Location</SubTitleText>
        <MapView
          region={{
            latitude: this.state.property.coordinate.latitude,
            longitude: this.state.property.coordinate.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0222
          }}
          style={{ flex: this.state.flex }}
          onMapReady={() => setTimeout(() => this.setState({ flex: 1 }), 500)}
        >
          {this.state.flex ? (
            <Marker
              coordinate={{
                latitude: this.state.property.coordinate.latitude,
                longitude: this.state.property.coordinate.longitude
              }}
              onDragEnd={e =>
                this.setState({ markerPosition: e.nativeEvent.coordinate })
              }
            />
          ) : null}
        </MapView>
      </PropertyLocationContainer>
    );
  };

  renderPropertyPictures = () => {
    return (
      <ImagesContainer>
        <SubTitleText>The pictures</SubTitleText>
        <PictureList pictures={this.state.property.pictures} />
      </ImagesContainer>
    );
  };

  renderHeader = () => {
    return (
      <HeaderContainer>
        <TitleText>Everything checks ? </TitleText>
        <Emoji name="eyes" style={{ fontSize: 30 }} />
      </HeaderContainer>
    );
  };
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          {this.renderHeader()}
          {this.renderPropertyLocation()}
          {this.renderPropertyInfo()}
          {this.renderPropertyPictures()}
          {this.renderMessages()}
          {this.renderButtonOrSpinner()}
        </Container>
      </ScrollView>
    );
  }
}
