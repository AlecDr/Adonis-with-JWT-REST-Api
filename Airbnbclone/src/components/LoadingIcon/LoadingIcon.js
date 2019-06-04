import React from "react";
import { Animated } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class LoadingIcon extends React.Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ).start();
  }

  render() {
    const rotation = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Icon name="loading" size={80} color="#ff7a7d" />
      </Animated.View>
    );
  }
}
