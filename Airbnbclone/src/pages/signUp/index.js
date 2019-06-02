import React from "react";
import { Dimensions } from "react-native";
import api from "../../services/api";

import Icon from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Image from "react-native-scalable-image";

import {
  Button,
  ButtonText,
  Container,
  TextInput,
  InputContainer,
  InputLabel,
  ErrorText,
  SuccessText,
  MessagesContainer
} from "./styles";

import LoadingIcon from "../../components/LoadingIcon";

export default class SignUp extends React.Component {
  state = {
    error: "",
    success: "",
    email: "",
    username: "",
    password: "",
    loading: false
  };

  static navigationOptions = {
    tabBarIcon: <Icon style={{ fontSize: 20 }} name="new-message" />,
    tabBarColor: "#ff6064"
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleUsernameChange = username => {
    this.setState({ username });
  };

  handleRegister = async () => {
    this.setState({
      success: "",
      error: "",
      loading: true
    });

    const { username, email, password } = this.state;

    if (username.length && email.length && password.length >= 6) {
      try {
        const response = await api.post("/users/create", {
          username,
          email,
          password
        });

        if (response.status == 201) {
          this.setState({
            email: "",
            password: "",
            username: "",
            success: response.data.message,
            loading: false
          });
        } else {
          this.setState({
            error: response.data.message,
            loading: false
          });
        }
      } catch (error) {
        console.log(error);
        this.setState({
          error: "Something went wrong, try again later!",
          loading: false
        });
      }
    } else {
      this.setState({
        error:
          "You must provide an valid name, email and a password with at least 6 characters!",
        loading: false
      });
    }
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

  renderButtonOrSpinner = () => {
    return this.state.loading ? (
      <LoadingIcon />
    ) : (
      <Button onPress={this.handleRegister}>
        <ButtonText>Register now</ButtonText>
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
          <Image
            width={Dimensions.get("window").width * 0.5}
            source={require("../../images/logo.png")}
          />
          <InputContainer>
            <InputLabel>Name</InputLabel>
            <TextInput
              onChangeText={this.handleUsernameChange}
              value={this.state.username}
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
          {this.renderMessages()}
          {this.renderButtonOrSpinner()}
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
