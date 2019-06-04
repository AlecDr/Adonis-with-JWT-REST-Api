import React from "react";
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import { DrawerItems } from "react-navigation";
import Image from "react-native-scalable-image";

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
    </SafeAreaView>
  );
};

export default CustomDrawerComponent;
