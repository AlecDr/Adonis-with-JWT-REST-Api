import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import MapView from "react-native-maps";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-root-toast";
import axios from "../../services/api";

import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
// custom components
import {
  Container,
  FindMeButton,
  BottomMapContainer,
  LoadingLocationContainer
} from "./styles";
import { PermissionsAndroid, AsyncStorage } from "react-native";

export default class MapPage extends React.Component {
  state = {
    region: {
      latitude: -28.65408,
      longitude: -56.00663,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0222
    },
    userLocationPermission: false,
    loadingLocation: false,
    loadingProperties: false,
    userToken: null,
    properties: []
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

  fetchProperties = async ({ geometry }) => {
    const longitude = geometry.coordinates[0];
    const latitude = geometry.coordinates[1];
    if (!this.state.userToken) {
      this.fetchUserToken();
    }

    this.setState({
      loadingProperties: true,
      properties: []
    });

    try {
      const response = await axios.get("/properties", {
        params: {
          token: this.state.userToken,
          latitude,
          longitude,
          distance: 10
        }
      });

      const properties = response.data;
      this.setState({
        loadingProperties: false,
        properties: properties
      });
    } catch (error) {
      Toast.show(JSON.stringify(error.message), {
        duration: 10000,
        position: Toast.positions.TOP + 45,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "#880e4f",
        delay: 100
      });
      this.setState({
        loadingProperties: false
      });
    }
  };

  checkUserLocationPermission = async () => {
    const corseLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    this.setState({
      userLocationPermission:
        corseLocationPermission && fineLocationPermission ? true : false
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
    this.setState(oldState => {
      return {
        region: {
          ...oldState.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        loadingLocation: false
      };
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

  renderProperties = () => {
    return this.state.properties.map((property, index) => (
      <MapboxGL.PointAnnotation
        id={index.toString()}
        key={index}
        coordinate={[property.longitude, property.latitude]}
      />
    ));
  };

  navigateToAddPropertyPage = () => {
    this.props.navigation.navigate("AddPropertySelectLocationPage");
  };

  handleFabItemPress = name => {
    switch (name) {
      case "btn_add_property":
        this.navigateToAddPropertyPage();
        break;
      case "btn_find":
        this.findMeHandler();
        break;
      default:
        this.findMeHandler();
    }
  };

  onRegionChange = region => {
    this.setState(oldState => {
      return {
        region: {
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
          latitude: region.latitude,
          longitude: region.longitude
        }
      };
    });
  };

  renderFabs = () => {
    const actions = [
      {
        text: "New property",
        icon: <Icon size={20} name="create" style={{ color: "white" }} />,
        name: "btn_add_property",
        color: "#880e4f",
        position: 1
      },
      {
        text: "Find me!",
        icon: <Icon size={20} name="my-location" style={{ color: "white" }} />,
        name: "btn_find",
        color: "#880e4f",
        position: 2
      }
    ];

    return (
      <FloatingAction
        color="#880e4f"
        onPressItem={this.handleFabItemPress}
        actions={actions}
      />
    );
  };

  render() {
    return (
      <Container>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChange}
          showsUserLocation={this.state.userLocationPermission}
        />
        <BottomMapContainer>
          <LoadingLocationContainer>
            {this.state.loadingLocation || this.state.loadingProperties ? (
              <LoadingIcon size={50} color="#880e4f" />
            ) : null}
          </LoadingLocationContainer>
        </BottomMapContainer>

        {this.renderFabs()}
      </Container>
    );
  }
}
