import { useScreens } from "react-native-screens";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { LoadingPage } from "./pages/index";
import { AuthStack, MainDrawer } from "./navigators/index";

useScreens();

const Routes = createSwitchNavigator(
  { AuthStack, MainDrawer, LoadingPage },
  { initialRouteName: "LoadingPage" }
);

export default createAppContainer(Routes);
