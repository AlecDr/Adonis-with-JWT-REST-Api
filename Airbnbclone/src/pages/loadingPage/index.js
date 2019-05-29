import React from "react";
import { AsyncStorage, Dimensions } from "react-native";

// custom components
import { LoaderText, MainContainer } from "./styles";

// libs components
import Image from "react-native-scalable-image";

export default class LoadingPage extends React.Component {
  render() {
    return (
      <MainContainer>
        <Image
          width={Dimensions.get("window").width}
          source={require("../../images/loading-image.png")}
        />
        <LoaderText>Loading...</LoaderText>
      </MainContainer>
    );
  }
}
