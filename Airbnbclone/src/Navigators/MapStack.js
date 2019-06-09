import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "react-navigation";
import { TouchableOpacity } from "react-native";
import { MapPage } from "../pages/index";

const MapStack = createStackNavigator({
  MapPage: {
    screen: MapPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#d65154"
        },
        headerTitle: "Map",
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon
              color="#ffeaeb"
              style={{ fontSize: 30, paddingLeft: 20 }}
              name="menu"
            />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => null}>
            <Icon
              color="#ffeaeb"
              style={{ fontSize: 30, paddingRight: 20 }}
              name="plus"
            />
          </TouchableOpacity>
        ),
        headerTintColor: "#ffeaeb"
      };
    }
  }
});

export default MapStack;
