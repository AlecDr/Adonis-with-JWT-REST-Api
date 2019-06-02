import React from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { MapPage, SignIn, SignUp, LoadingPage, UserPage } from "./pages/index";
import { TouchableOpacity } from "react-native-gesture-handler";

const AuthStack = createMaterialBottomTabNavigator(
  {
    "Sign In": SignIn,
    "Sign Up": SignUp
  },
  {
    shifting: true
  }
);

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

const DrawerNavigator = createDrawerNavigator({
  Main: {
    screen: MainStackNavigator
  }
});

const Routes = createSwitchNavigator(
  { AuthStack, DrawerNavigator, LoadingPage },
  { initialRouteName: "LoadingPage" }
);

export default createAppContainer(Routes);
