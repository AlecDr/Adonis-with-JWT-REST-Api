import React from "react";
import { AsyncStorage, Dimensions } from "react-native";

// navigation
import { SwitchActions } from "react-navigation";

// custom components
import { Text, ButtonText, MainContainer, AuthenticateButton } from "./styles";

// libs components
import Image from "react-native-scalable-image";

export default class LoadingPage extends React.Component {
  state = {
    loadingDots: "...",
    error: false,
    interval: null
  };

  componentDidMount = () => {
    const interval = setInterval(() => {
      this.addLoadingDots();
    }, 300);

    this.setState({ interval });
    setTimeout(() => {
      this._checkAuth();
    }, 1000);
  };

  _checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
      } else {
        this.setState({ error: true });
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.state.interval);
  };

  addLoadingDots = () => {
    let loadingDots = "";

    if (this.state.loadingDots === "") loadingDots = ".";
    if (this.state.loadingDots === ".") loadingDots = "..";
    if (this.state.loadingDots === "..") loadingDots = "...";
    if (this.state.loadingDots === "...") loadingDots = "";

    this.setState({ loadingDots });
  };

  handleAuthenticateButtonPress = () => {
    this.props.navigation.navigate("AuthStack");
  };

  _renderLoadingOrError = () => {
    if (this.state.error) {
      return (
        <MainContainer>
          <Image
            width={Dimensions.get("window").width}
            source={require("../../images/error-image.png")}
          />
          <Text>Not authenticated!</Text>
          <AuthenticateButton onPress={this.handleAuthenticateButtonPress}>
            <ButtonText>Authenticate now</ButtonText>
          </AuthenticateButton>
        </MainContainer>
      );
    } else {
      return (
        <MainContainer>
          <Image
            width={Dimensions.get("window").width}
            source={require("../../images/loading-image.png")}
          />
          <Text>Loading{this.state.loadingDots}</Text>
        </MainContainer>
      );
    }
  };

  render() {
    return this._renderLoadingOrError();
  }
}
