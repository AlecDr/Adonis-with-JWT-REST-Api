import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
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
      </Container>
    );
  }
}
