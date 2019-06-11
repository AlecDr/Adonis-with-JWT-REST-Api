import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialIcons";

// custom components
import {
  Container,
  MapContainer,
  FormContainer,
  BottomMapContainer,
  LoadingLocationContainer
} from "./styles";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

import { PermissionsAndroid, AsyncStorage } from "react-native";

export default class AddPropertyPage extends React.Component {
  state = {
    location: [-56.00663, -28.65408],
    userLocationPermission: false,
    loadingLocation: false,
    loadingProperties: false,
    userToken: null
  };

  componentWillMount() {
    MapboxGL.setAccessToken(
      "pk.eyJ1IjoiYWxlY2RyIiwiYSI6ImNqd21xeHlnbDBldHk0OGtlc2E0dmExbDEifQ.6j75oBJ1XdFbgbmFc4W7Fw"
    );
  }

  componentDidMount() {
    this.checkUserLocationPermission();
    this.fetchUserToken();
    MapboxGL.setTelemetryEnabled(false);
  }

  fetchUserToken = async () => {
    const token = await AsyncStorage.getItem("user_token");
    this.setState({ userToken: token });
  };

  checkUserLocationPermission = async () => {
    const corseLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    this.setState({
      userLocationPermission: corseLocationPermission && fineLocationPermission
    });
  };

  showLocationNotAccessibleError = () => {
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
  };

  handlePositionChange = position => {
    const longitude =
      this.state.location[0] == position.coords.longitude
        ? position.coords.longitude + 0.00001
        : position.coords.longitude;

    const latitude =
      this.state.location[1] == position.coords.latitude
        ? position.coords.latitude + 0.00001
        : position.coords.latitude;

    this.setState({
      location: [longitude, latitude],
      loadingLocation: false
    });
  };

  findMeHandler = () => {
    this.setState({ loadingLocation: true });

    // first try with the high accuracy
    navigator.geolocation.getCurrentPosition(
      position => {
        this.handlePositionChange(position);
      },
      error => {
        /**
         * If the high accuracy cant find the user,
         * try without it.
         */
        navigator.geolocation.getCurrentPosition(
          position => {
            this.handlePositionChange(position);
          },
          error => {
            this.showLocationNotAccessibleError();
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 15000 }
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 15000 }
    );
  };

  render() {
    return (
      <Container>
        <MapContainer>
          <MapboxGL.MapView
            animated={true}
            logoEnabled={false}
            styleURL={MapboxGL.StyleURL.Light}
            attributionEnabled={false}
            style={{ flex: 1 }}
            onRegionDidChange={this.fetchProperties}
          >
            <MapboxGL.Camera
              zoomLevel={15}
              animationMode={"flyTo"}
              centerCoordinate={this.state.location}
            />
            <MapboxGL.UserLocation />
          </MapboxGL.MapView>
          <BottomMapContainer>
            <LoadingLocationContainer>
              {this.state.loadingLocation || this.state.loadingProperties ? (
                <LoadingIcon size={50} color="#880e4f" />
              ) : null}
            </LoadingLocationContainer>
          </BottomMapContainer>
        </MapContainer>
        <FormContainer />

        <ActionButton
          renderIcon={() => (
            <Icon size={30} name="add" style={{ color: "white" }} />
          )}
          offsetX={20}
          offsetY={20}
          buttonColor="#ff6064"
        >
          <ActionButton.Item
            buttonColor="#880e4f"
            title="Create property"
            onPress={() => null}
          >
            <Icon size={20} name="check" style={{ color: "white" }} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#4a148c"
            title="Find me!"
            onPress={this.findMeHandler}
          >
            <Icon size={20} name="my-location" style={{ color: "white" }} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    );
  }
}
