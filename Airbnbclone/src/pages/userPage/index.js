import React from "react";
import Image from "react-native-scalable-image";

// custom components
import {
  Container,
  UserInfoContainer,
  UserNameText,
  UserEmailText
} from "./styles";
import { SafeAreaView, Dimensions } from "react-native";

export default class UserPage extends React.Component {
  state = {
    loading: true,
    userData: null
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = async () => {};

  renderUserInfo = () => {};

  render() {
    return (
      <SafeAreaView>
        <Container>
          <Image
            width={Dimensions.get("window").width * 0.35}
            source={require("../../images/default-user.png")}
          />
          <UserInfoContainer>
            <UserNameText>My very long unique name</UserNameText>
            <UserEmailText>Some@dumbemail.com</UserEmailText>
          </UserInfoContainer>
        </Container>
      </SafeAreaView>
    );
  }
}
