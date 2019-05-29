import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import { Main, SignIn, SignUp, LoadingPage } from "./pages/index";

const AuthStack = createStackNavigator({ SignIn: SignIn, SignUp: SignUp });

const Routes = createSwitchNavigator(
  { AuthStack, Main, LoadingPage },
  { initialRouteName: "LoadingPage" }
);

export default createAppContainer(Routes);
