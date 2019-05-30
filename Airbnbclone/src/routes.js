import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { Main, SignIn, SignUp, LoadingPage } from "./pages/index";

const AuthStack = createMaterialBottomTabNavigator(
  {
    "Sign In": SignIn,
    "Sign Up": SignUp
  },
  {
    shifting: true
  }
);

const Routes = createSwitchNavigator(
  { AuthStack, Main, LoadingPage },
  { initialRouteName: "LoadingPage" }
);

export default createAppContainer(Routes);
