import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { MapPage, SignIn, SignUp, LoadingPage, UserPage } from "./pages/index";

const AuthStack = createMaterialBottomTabNavigator(
  {
    "Sign In": SignIn,
    "Sign Up": SignUp
  },
  {
    shifting: true
  }
);

const MainStack = createMaterialBottomTabNavigator(
  {
    Map: MapPage,
    Profile: UserPage
  },
  {
    shifting: true
  }
);

const Routes = createSwitchNavigator(
  { AuthStack, MainStack, LoadingPage },
  { initialRouteName: "LoadingPage" }
);

export default createAppContainer(Routes);
