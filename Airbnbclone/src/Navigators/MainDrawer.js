import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

import { createDrawerNavigator, createStackNavigator } from "react-navigation";

import { MapPage, UserPage } from "../pages/index";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Map: MapPage,
    Profile: UserPage
  },
  {
    shifting: true,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const MainStackNavigator = createStackNavigator(
  {
    MainTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon style={{ paddingLeft: 10 }} name="menu" size={30} />
          </TouchableOpacity>
        )
      };
    }
  }
);

const MainDrawer = createDrawerNavigator({
  Main: {
    screen: MainStackNavigator
  }
});

export default MainDrawer;
