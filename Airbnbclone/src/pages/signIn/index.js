import React from "react";
import { Dimensions, AsyncStorage } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
  MessagesContainer,
  SuccessText
} from "./styles";

import LoadingIcon from "../../components/LoadingIcon";
import api from "../../services/api";
import reactotron from "reactotron-react-native";

export default class SignIn extends React.Component {
  state = {
    error: "",
    email: "",
    password: "",
    success: "",
    loading: false
  };

  static navigationOptions = {
    tabBarIcon: <Icon style={{ fontSize: 20 }} name="login" />,
    tabBarColor: "#ff7a7d"
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleAuthenticate = async () => {
    this.setState({ error: "", success: "", loading: true });
    const { email, password } = this.state;

    if (email.length && password.length) {
      try {
        const response = await api.post("/auth/authenticate", {
          email,
          password
        });
        if (response.status == 201) {
          this.setState({
            loading: false,
            success: "User authenticated, processing...",
            error: ""
          });

          await AsyncStorage.setItem("user_token", response.data.token.token);
          await AsyncStorage.setItem("user_name", response.data.user.name);
          await AsyncStorage.setItem("user_email", response.data.user.email);
          this.props.navigation.navigate("DrawerNavigator");
        } else {
          this.setState({
            loading: false,
            success: "",
            error: response.data.message
          });
        }
      } catch (error) {
        reactotron.log(error);
        this.setState({
          loading: false,
          success: "",
          error: "Something went wrong!" + error
        });
      }
    } else {
      reactotron.log(error);
      this.setState({
        error: "You should enter an valid email and password",
        success: "",
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
      <Button onPress={this.handleAuthenticate}>
        <ButtonText>Login</ButtonText>
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
