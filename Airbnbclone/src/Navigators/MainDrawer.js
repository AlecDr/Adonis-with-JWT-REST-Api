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
import CustomDrawerComponent from "../components/CustomDrawerComponent/CustomDrawerComponent";

const MainTabNavigator = createBottomTabNavigator(
  {
    Map: {
      screen: MapStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} style={{ fontSize: 20 }} name="mapbox" />
        ),
        headerTitle: "Profile"
      }
    },
    Profile: {
      screen: UserProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FAIcon color={tintColor} style={{ fontSize: 20 }} name="user" />
        ),
        headerTitle: "Profile"
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#ffeaeb",
      inactiveTintColor: "#ffa5a7",
      style: {
        backgroundColor: "#ff6064"
      }
    }
  }
);

const MainDrawer = createDrawerNavigator(
  { App: MainTabNavigator },
  { contentComponent: CustomDrawerComponent }
);

export default MainDrawer;
