import React from "react";
import Mapbox from "@react-native-mapbox-gl/maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-root-toast";

import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
// custom components
import {
  Container,
  FindMeButton,
  BottomMapContainer,
  LoadingLocationContainer
} from "./styles";
import { PermissionsAndroid } from "react-native";

export default class MapPage extends React.Component {
  state = {
    location: [-56.00663, -28.65408],
    userLocationPermission: false,
    loadingLocation: false
  };

  componentWillMount() {
    Mapbox.setAccessToken(
      "pk.eyJ1IjoiYWxlY2RyIiwiYSI6ImNqd21xeHlnbDBldHk0OGtlc2E0dmExbDEifQ.6j75oBJ1XdFbgbmFc4W7Fw"
    );
  }

  componentDidMount() {
    Mapbox.setTelemetryEnabled(false);
    this.checkUserLocationPermission();
  }

  checkUserLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    this.setState({
      userLocationPermission: granted
    });
  };

  findMeHandler = async () => {
    this.setState({ loadingLocation: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: [position.coords.longitude, position.coords.latitude],
          loadingLocation: false
        });
      },
      error => {
        let toast = Toast.show("Your location is not accessible right now!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP + 45,
          shadow: true,
          animation: true,
          hideOnPress: true,
          backgroundColor: "#880e4f",
          delay: 100
        });
        this.setState({ loadingLocation: false });
        setTimeout(function() {
          Toast.hide(toast);
        }, 5000);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 }
    );
  };

  render() {
    return (
      <Container>
        <Mapbox.MapView
          animated={true}
          logoEnabled={false}
          styleURL={Mapbox.StyleURL.Light}
          attributionEnabled={false}
          style={{ flex: 1 }}
        >
          <Mapbox.Camera
            zoomLevel={13}
            animationMode={"flyTo"}
            centerCoordinate={this.state.location}
          />
          {this.state.userLocationPermission ? <Mapbox.UserLocation /> : null}
        </Mapbox.MapView>
        <BottomMapContainer>
          <FindMeButton onPress={this.findMeHandler}>
            <Icon
              style={{ margin: 0, padding: 0 }}
              name="my-location"
              size={30}
              color="#fff"
            />
          </FindMeButton>
          <LoadingLocationContainer>
            {this.state.loadingLocation ? <LoadingIcon size={50} /> : null}
          </LoadingLocationContainer>
        </BottomMapContainer>
      </Container>
    );
  }
}
