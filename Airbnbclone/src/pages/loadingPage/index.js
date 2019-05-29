import React from "react";
import { AsyncStorage, Dimensions } from "react-native";

// custom components
import { LoaderText, MainContainer } from "./styles";

// libs components
import Image from "react-native-scalable-image";

export default class LoadingPage extends React.Component {
  state = {
    loadingDots: "...",
    interval: null
  };

  componentDidMount = () => {
    const interval = setInterval(() => {
      this.addLoadingDots();
    }, 300);

    this.setState({ interval });
  };

  componentWillUnmount = () => {};

  addLoadingDots = () => {
    let loadingDots = "";

    if (this.state.loadingDots === "") loadingDots = ".";
    if (this.state.loadingDots === ".") loadingDots = "..";
    if (this.state.loadingDots === "..") loadingDots = "...";
    if (this.state.loadingDots === "...") loadingDots = "";

    this.setState({ loadingDots });
  };

  render() {
    return (
      <MainContainer>
        <Image
          width={Dimensions.get("window").width}
          source={require("../../images/loading-image.png")}
        />
        <LoaderText>Loading{this.state.loadingDots}</LoaderText>
      </MainContainer>
    );
  }
}
