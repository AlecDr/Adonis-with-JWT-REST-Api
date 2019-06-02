import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { LoadingPage } from "./pages/index";
import { AuthStack, MainDrawer } from "./Navigators/index";

const Routes = createSwitchNavigator(
  { AuthStack, MainDrawer, LoadingPage },
  { initialRouteName: "LoadingPage" }
);

export default createAppContainer(Routes);
