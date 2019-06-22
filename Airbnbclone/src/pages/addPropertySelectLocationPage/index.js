import React from "react";
import MapView, { Marker } from "react-native-maps";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";

// custom components
import {
  Container,
  MapContainer,
  BottomMapContainer,
  LoadingLocationContainer
} from "./styles";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

import { PermissionsAndroid, AsyncStorage } from "react-native";

export default class AddPropertySelectLocationPage extends React.Component {
  state = {
    region: {
      latitude: -28.65408,
      longitude: -56.00663,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0222
    },
    markerPosition: {
      latitude: -28.65408,
      longitude: -56.00663
    },
    flex: 0,
    location: [-56.00663, -28.65408],
    userLocationPermission: false,
    loadingLocation: false,
    loadingProperties: false,
    userToken: null
  };

  componentDidMount() {
    this.checkUserLocationPermission();
    this.fetchUserToken();
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
      userLocationPermission:
        corseLocationPermission && fineLocationPermission ? true : false
    });
  };

  onRegionChange = region => {
    this.setState({
      region: {
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
  };

  handleFabItemPress = name => {
    switch (name) {
      case "btn_choose_a_photo_property":
        this.navigateToAddPropertyPage();
        break;
    }
  };

  navigateToAddPropertyPage = () => {
    this.props.navigation.navigate("AddPropertyPicturesPage", {
      coordinate: this.state.markerPosition
    });
  };

  renderFabs = () => {
    const actions = [
      {
        text: "Next",
        icon: (
          <Icon size={20} name="navigate-next" style={{ color: "white" }} />
        ),
        name: "btn_choose_a_photo_property",
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

  render() {
    return (
      <Container>
        <MapContainer>
          <MapView
            region={this.state.region}
            style={{ flex: this.state.flex }}
            onRegionChangeComplete={this.onRegionChange}
            showsUserLocation={this.state.userLocationPermission}
            showsMyLocationButton
            onMapReady={() => setTimeout(() => this.setState({ flex: 1 }), 500)}
          >
            {this.state.flex ? (
              <Marker
                draggable
                coordinate={{ latitude: -28.65408, longitude: -56.00663 }}
                onDragEnd={e =>
                  this.setState({ markerPosition: e.nativeEvent.coordinate })
                }
              />
            ) : null}
          </MapView>
          <BottomMapContainer>
            <LoadingLocationContainer>
              {this.state.loadingLocation || this.state.loadingProperties ? (
                <LoadingIcon size={50} color="#880e4f" />
              ) : null}
            </LoadingLocationContainer>
          </BottomMapContainer>
        </MapContainer>
        {this.renderFabs()}
      </Container>
    );
  }
}
