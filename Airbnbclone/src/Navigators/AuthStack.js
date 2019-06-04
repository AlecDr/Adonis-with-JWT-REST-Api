import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { SignIn, SignUp } from "../pages/index";

import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";

const AuthStack = createBottomTabNavigator(
  {
    "Sign In": {
      screen: SignIn,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MIcon color={tintColor} style={{ fontSize: 20 }} name="login" />
        ),
        headerTitle: "Profile"
      }
    },
    "Sign Up": {
      screen: SignUp,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <EIcon color={tintColor} style={{ fontSize: 20 }} name="user" />
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
      },
      keyboardHidesTabBar: true
    }
  }
);

export default AuthStack;
