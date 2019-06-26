import React from "react";
import api from "../../services/api";
import Emoji from "react-native-emoji";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import {
  Button,
  ButtonText,
  Container,
  HeaderContainer,
  TitleText,
  MessagesContainer
} from "./styles";

export default class AddPropertySubmitPage extends React.Component {
  state = {
    property: this.props.navigation.getParam("property", null),
    success: "",
    error: "",
    loading: false
  };

  renderButtonOrSpinner = () => {
    return this.state.loading ? (
      <LoadingIcon />
    ) : (
      <Button onPress={this.handleAddProperty}>
        <ButtonText>Add Property</ButtonText>
      </Button>
    );
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
    // try {
    //   const { title, price, address } = this.state;
    //   this.setState({ loading: true });
    //   if (title.trim() !== "" && address.trim() !== "" && price > 0) {
    //     const response = await api.post("/properties", {
    //       title,
    //       price,
    //       address,
    //       latitude: markerCoordinate.latitude,
    //       longitude: markerCoordinate.longitude
    //     });
    //     const id = response.data.property.id;
    //     this.state.pictures.map(picture => {});
    //   } else {
    //     this.setState({
    //       loading: false,
    //       error:
    //         "Your need to inform a title, address and price for your property!"
    //     });
    //   }
    // } catch (error) {
    //   this.setState({ loading: false });
    // }
  };

  renderPropertyInfo = () => {};

  renderPropertyLocation = () => {};

  renderPropertyPictures = () => {};

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
      <Container behavior="padding" enabled>
        {this.renderHeader()}
        {this.renderPropertyLocation()}
        {this.renderPropertyInfo()}
        {this.renderPropertyPictures()}
        {this.renderMessages()}
        {this.renderButtonOrSpinner()}
      </Container>
    );
  }
}
