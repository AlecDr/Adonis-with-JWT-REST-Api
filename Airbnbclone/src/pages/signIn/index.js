import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class SignIn extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Icon style={{ fontSize: 20 }} name="login" />,
    tabBarColor: "#ff7a7d"
  };

  render() {
    return null;
  }
}
