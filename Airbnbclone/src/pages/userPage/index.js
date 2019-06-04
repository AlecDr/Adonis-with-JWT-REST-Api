import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class UserPage extends React.Component {
  state = {
    loading: true,
    userData: null
  };

  static navigationOptions = {
    headerTitle: "Profile",
    headerLeft: <Icon style={{ fontSize: 30, paddingLeft: 20 }} name="menu" />
  };

  componentDidMount() {}

  render() {
    return null;
  }
}
