import React from "react";
import Image from "react-native-scalable-image";
import Shimmer from "react-native-shimmer-placeholder";

// custom components
import {
  Container,
  UserInfoContainer,
  UserNameText,
  UserEmailText
} from "./styles";
import { SafeAreaView, Dimensions, AsyncStorage } from "react-native";

export default class UserPage extends React.Component {
  state = {
    loading: true,
    userData: null
  };

  componentDidMount() {
    setTimeout(() => {
      this.loadUserInfo();
    }, 2000);
  }

  loadUserInfo = async () => {
    const userName = await AsyncStorage.getItem("user_name");
    const userEmail = await AsyncStorage.getItem("user_email");

    this.setState({
      loading: false,
      userData: {
        userName,
        userEmail
      }
    });
  };

  renderUserInfo = () => {
    if (this.state.loading) {
      return (
        <Container>
          <Shimmer
            style={{ marginVertical: 10, borderRadius: 50 }}
            autoRun
            width={100}
            height={100}
          />
          <Shimmer
            autoRun
            width={Dimensions.get("window").width * 0.5}
            height={16}
          />
          <Shimmer
            autoRun
            style={{ marginVertical: 10 }}
            width={Dimensions.get("window").width * 0.45}
            height={10}
          />
        </Container>
      );
    } else {
      return (
        <Container>
          <Image
            width={Dimensions.get("window").width * 0.35}
            source={require("../../images/default-user.png")}
          />
          <UserInfoContainer>
            <UserNameText>{this.state.userData.userName}</UserNameText>
            <UserEmailText>{this.state.userData.userEmail}</UserEmailText>
          </UserInfoContainer>
        </Container>
      );
    }
  };

  render() {
    return <SafeAreaView>{this.renderUserInfo()}</SafeAreaView>;
  }
}
