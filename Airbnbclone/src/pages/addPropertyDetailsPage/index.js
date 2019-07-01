import React from "react";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Emoji from "react-native-emoji";
import {
  Container,
  HeaderContainer,
  TitleText,
  MessagesContainer,
  ErrorText
} from "./styles";

import InputGroup from "../../components/InputGroup";

export default class AddPropertyDetailsPage extends React.Component {
  state = {
    markerCoordinate: this.props.navigation.getParam("coordinate", null),
    pictures: this.props.navigation.getParam("pictures", []),
    price: 0,
    title: "",
    address: "",
    error: ""
  };

  handleTitleChange = title => this.setState({ title });
  handleAddressChange = address => this.setState({ address });
  handlePriceChange = price => this.setState({ price });

  handleFabItemPress = name => {
    switch (name) {
      case "btn_property_info":
        this.navigateToPropertySubmitPage();
        break;
    }
  };

  navigateToPropertySubmitPage = () => {
    const { address, title, price } = this.state;
    if (address.trim() !== "" && title.trim() !== "" && price > 0) {
      this.props.navigation.navigate("AddPropertySubmitPage", {
        property: {
          latitude: this.state.markerCoordinate.latitude,
          longitude: this.state.markerCoordinate.longitude,
          title: this.state.title,
          address: this.state.address,
          price: this.state.price,
          pictures: this.state.pictures
        }
      });
    } else {
      this.setState({
        error:
          "You must provide a valid title, address and price to your property!"
      });
    }
  };

  renderFabs = () => {
    const actions = [
      {
        text: "Check Info",
        icon: <Icon size={20} name="cube-send" style={{ color: "white" }} />,
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

  renderErrorMessage = () => {
    if (this.state.error != "")
      return (
        <MessagesContainer>
          <ErrorText>{this.state.error}</ErrorText>
        </MessagesContainer>
      );
  };

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fff",
          flexGrow: 1
        }}
        style={{ flex: 1 }}
      >
        <Container behavior="padding" enabled>
          <HeaderContainer>
            <TitleText>Finally, add some details</TitleText>
            <Emoji name="raised_hands" style={{ fontSize: 30 }} />
          </HeaderContainer>
          {this.renderErrorMessage()}
          <InputGroup
            label="Title"
            onChangeText={this.handleTitleChange}
            value={this.state.title}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Property Title"
          />
          <InputGroup
            label="Address"
            onChangeText={this.handleAddressChange}
            value={this.state.address}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Address"
          />
          <InputGroup
            label="Price"
            onChangeText={this.handlePriceChange}
            value={`${this.state.price}`}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            placeholder="Price"
          />
        </Container>
        {this.renderFabs()}
      </KeyboardAwareScrollView>
    );
  }
}
