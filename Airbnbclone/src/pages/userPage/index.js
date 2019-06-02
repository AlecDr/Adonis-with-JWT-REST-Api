import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class UserPage extends React.Component {
  state = {
    loading: true,
    userData: null
  };

  static navigationOptions = {
    tabBarIcon: <Icon style={{ fontSize: 20 }} name="user" />,
    tabBarColor: "#ff7a7d",
    headerTitle: "Profile"
  };

  componentDidMount() {}

  render() {
    return null;
  }
}
