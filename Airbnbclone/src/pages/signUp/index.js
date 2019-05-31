import React from "react";
import { Dimensions } from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Image from "react-native-scalable-image";

import {
  Button,
  ButtonText,
  Container,
  TextInput,
  InputContainer,
  InputLabel
} from "./styles";

export default class SignUp extends React.Component {
  state = {
    error: "",
    email: "",
    name: "",
    password: ""
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleNameChange = name => {
    this.setState({ name });
  };

  static navigationOptions = {
    tabBarIcon: <Icon style={{ fontSize: 20 }} name="new-message" />,
    tabBarColor: "#ff6064"
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
          <Image
            width={Dimensions.get("window").width * 0.5}
            source={require("../../images/logo.png")}
          />
          <InputContainer>
            <InputLabel>Name</InputLabel>
            <TextInput
              onChangeText={this.handleNameChange}
              value={this.state.name}
              autoCapitalize={false}
              autoCorrect={false}
              placeholder="Name"
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Email</InputLabel>
            <TextInput
              onChangeText={this.handleEmailChange}
              value={this.state.email}
              autoCapitalize={false}
              autoCorrect={false}
              placeholder="Email"
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Password</InputLabel>
            <TextInput
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              autoCapitalize={false}
              autoCorrect={false}
              secureTextEntry
              placeholder="********"
            />
          </InputContainer>
          <Button>
            <ButtonText>Register now</ButtonText>
          </Button>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
