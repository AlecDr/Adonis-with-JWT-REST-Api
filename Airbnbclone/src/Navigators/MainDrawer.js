import {
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FAIcon from "react-native-vector-icons/FontAwesome5";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import MapStack from "./MapStack";
import UserProfileStack from "./UserProfileStack";

const MainTabNavigator = createBottomTabNavigator(
  {
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarIcon: <Icon style={{ fontSize: 20 }} name="mapbox" />,
        tabBarColor: "#ff6064",
        headerTitle: "Profile",
        header: null
      }
    },
    Profile: {
      screen: UserProfileStack,
      navigationOptions: {
        tabBarIcon: <FAIcon style={{ fontSize: 20 }} name="user" />,
        tabBarColor: "#ff7a7d",
        headerTitle: "Profile",
        header: null
      }
    }
  },
  {
    shifting: true
  }
);

const MainDrawer = createDrawerNavigator({ App: MainTabNavigator });

export default MainDrawer;
