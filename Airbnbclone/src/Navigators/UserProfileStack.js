import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation";
import { UserPage } from "../pages/index";

const UserProfileStack = createStackNavigator({
  UserPage: {
    screen: UserPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "User",
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon style={{ fontSize: 30, paddingLeft: 20 }} name="menu" />
          </TouchableOpacity>
        )
      };
    }
  }
});

export default UserProfileStack;
