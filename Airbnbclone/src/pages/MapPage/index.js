import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-root-toast";
import axios from "../../services/api";
import PropertyCallout from "../../components/PropertyCallout";

import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

// custom components
import {
  Container,
  BottomMapContainer,
  LoadingLocationContainer
} from "./styles";
import { PermissionsAndroid, AsyncStorage, Text } from "react-native";

export default class MapPage extends React.Component {
  state = {
    region: {
      latitude: -28.65408,
      longitude: -56.00663,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0222
    },
    flex: 0,
    userLocationPermission: false,
    loadingProperties: false,
    userToken: null,
    focused: true,
    mapIsReady: false,
    properties: []
  };

  registerNavigatorWatchers = () => {
    this.props.navigation.addListener("didFocus", () => {
      this.fetchProperties();
    });
  };

  async componentDidMount() {
    await this.checkUserLocationPermission();
    await this.fetchUserToken();
    await this.registerNavigatorWatchers();
  }

  fetchUserToken = async () => {
    const token = await AsyncStorage.getItem("user_token");
    this.setState({ userToken: token });
  };

  fetchProperties = async () => {
    if (!this.state.loadingProperties) {
      const { longitude, latitude } = this.state.region;

      if (!this.state.userToken) {
        await this.fetchUserToken();
      }

      this.setState({
        loadingProperties: true
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
    }
  };

  checkUserLocationPermission = () => {
    setTimeout(async () => {
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
    }, 500);
  };

  renderProperties = () => {
    if (this.state.mapIsReady) {
      return this.state.properties.map((property, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: property.latitude,
            longitude: property.longitude
          }}
        >
          <PropertyCallout detailsPressHandler={null} title={property.title} />
        </Marker>
      ));
    } else {
      return null;
    }
  };

  navigateToAddPropertyPage = () => {
    this.props.navigation.navigate("AddPropertySelectLocationPage");
  };

  handleFabItemPress = name => {
    switch (name) {
      case "btn_add_property":
        this.navigateToAddPropertyPage();
        break;
    }
  };

  onRegionChange = async region => {
    await this.setState({
      region: {
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
        latitude: region.latitude,
        longitude: region.longitude
      }
    });

    this.fetchProperties();
  };

  renderFabs = () => {
    const actions = [
      {
        text: "New property",
        icon: <Icon size={20} name="create" style={{ color: "white" }} />,
        name: "btn_add_property",
        color: "#880e4f",
        position: 1
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

  renderMap = () => {
    if (this.state.userLocationPermission) {
      return (
        <Container>
          <MapView
            initialRegion={this.state.region}
            style={{ flex: this.state.flex }}
            onRegionChangeComplete={this.onRegionChange}
            showsUserLocation={this.state.userLocationPermission}
            showsMyLocationButton
            onMapReady={() =>
              setTimeout(
                () => this.setState({ flex: 1, mapIsReady: true }),
                1000
              )
            }
          >
            {this.renderProperties()}
          </MapView>
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
    } else {
      return <Container />;
    }
  };

  render() {
    return this.renderMap();
  }
}
