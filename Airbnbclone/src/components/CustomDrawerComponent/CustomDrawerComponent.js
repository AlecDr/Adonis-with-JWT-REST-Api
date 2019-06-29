import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback
} from "react-native";
import { DrawerItems } from "react-navigation";
import Image from "react-native-scalable-image";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { LogoutContainer, LogoutButton, LogoutButtonText } from "./styles";
import { SwitchActions } from "react-navigation";
import { AsyncStorage } from "react-native";

const Logout = async navigation => {
  await AsyncStorage.multiRemove(["user_token", "user_name", "user_email"]);
  navigation.dispatch(SwitchActions.jumpTo({ routeName: "AuthStack" }));
};

const CustomDrawerComponent = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ margin: 40 }}
          width={Dimensions.get("window").width * 0.35}
          source={require("../../images/airbnb_words.png")}
        />
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <LogoutContainer>
        <TouchableNativeFeedback
          onPress={() => {
            Logout(props.navigation);
          }}
          background={TouchableNativeFeedback.SelectableBackground()}
        >
          <LogoutButton>
            <Icon name="logout" size={15} color="white" />
            <LogoutButtonText>Logout</LogoutButtonText>
          </LogoutButton>
        </TouchableNativeFeedback>
      </LogoutContainer>
    </SafeAreaView>
  );
};

export default CustomDrawerComponent;
