import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { SignIn, SignUp } from "../pages/index";

const AuthStack = createMaterialBottomTabNavigator(
  {
    "Sign In": SignIn,
    "Sign Up": SignUp
  },
  {
    shifting: true
  }
);

export default AuthStack;
