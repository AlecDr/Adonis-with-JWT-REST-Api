import React from "react";
import { AsyncStorage, Dimensions } from "react-native";

// navigation
import { SwitchActions } from "react-navigation";

// custom components
import { Text, ButtonText, MainContainer, AuthenticateButton } from "./styles";

// libs components
import Image from "react-native-scalable-image";
import LoadingIcon from "../../components/LoadingIcon";

export default class LoadingPage extends React.Component {
  state = {
    error: false
  };

  componentDidMount = () => {
    this._checkAuth();
  };

  _checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      if (token) {
        this.props.navigation.navigate("DrawerNavigator");
      } else {
        this.setState({ error: true });
      }
    } catch (error) {
      this.setState({ error: true });
    }
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
          <LoadingIcon />
        </MainContainer>
      );
    }
  };

  render() {
    return this._renderLoadingOrError();
  }
}
