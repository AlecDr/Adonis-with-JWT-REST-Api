import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialIcons";

// custom components
import { Container, MapContainer, FormContainer } from "./styles";

export default class AddPropertyPage extends React.Component {
  state = {
    location: [-56.00663, -28.65408]
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
            onPress={() => null}
          >
            <Icon size={20} name="my-location" style={{ color: "white" }} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    );
  }
}
