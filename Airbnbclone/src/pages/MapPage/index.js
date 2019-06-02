import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class MapPage extends React.Component {
  static navigationOptions = {
    tabBarIcon: <Icon style={{ fontSize: 20 }} name="mapbox" />,
    tabBarColor: "#ff6064",
    headerTitle: "Profile"
  };

  componentDidMount() {}

  render() {
    return null;
  }
}
