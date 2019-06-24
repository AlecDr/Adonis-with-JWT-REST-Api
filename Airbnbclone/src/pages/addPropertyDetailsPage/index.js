import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Emoji from "react-native-emoji";
import {
  Button,
  ButtonText,
  Container,
  ErrorText,
  MessagesContainer,
  SuccessText,
  HeaderContainer,
  TitleText
} from "./styles";

import InputGroup from "../../components/InputGroup";

export default class AddPropertyDetailsPage extends React.Component {
  state = {
    markerCoordinate: this.props.navigation.getParam("coordinate", null),
    pictures: this.props.navigation.getParam("pictures", []),
    price: 0,
    title: "",
    address: "",
    error: "",
    success: "",
    loading: false
  };

  handleTitleChange = title => this.setState({ title });
  handleAddressChange = address => this.setState({ address });
  handlePriceChange = price => this.setState({ price });

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

  renderButtonOrSpinner = () => {
    return this.state.loading ? (
      <LoadingIcon />
    ) : (
      <Button onPress={this.handleAuthenticate}>
        <ButtonText>Add Property</ButtonText>
      </Button>
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
          {this.renderButtonOrSpinner()}
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
