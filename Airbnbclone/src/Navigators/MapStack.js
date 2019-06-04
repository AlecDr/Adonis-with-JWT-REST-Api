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
        headerTitle: "Map",
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon style={{ fontSize: 30, paddingLeft: 20 }} name="menu" />
          </TouchableOpacity>
        )
      };
    }
  }
});

export default MapStack;
