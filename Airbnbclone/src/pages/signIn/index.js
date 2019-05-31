import React from "react";
import { Dimensions } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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

export default class SignIn extends React.Component {
  state = {
    error: "",
    email: "",
    password: ""
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  static navigationOptions = {
    tabBarIcon: <Icon style={{ fontSize: 20 }} name="login" />,
    tabBarColor: "#ff7a7d"
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
            <ButtonText>Login</ButtonText>
          </Button>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
