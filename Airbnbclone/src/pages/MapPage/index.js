import React from "react";
import Mapbox from "@react-native-mapbox-gl/maps";

// custom components
import { Container } from "./styles";

export default class MapPage extends React.Component {
  componentWillMount() {
    Mapbox.setAccessToken(
      "pk.eyJ1IjoiYWxlY2RyIiwiYSI6ImNqc3hiOTViaDBrNWU0YW14dDA2YjNvdTYifQ.fwUsz-HyzY4STwp9A61G9Q"
    );
  }

  render() {
    return (
      <Container>
        <Mapbox.MapView style={{ flex: 1 }} />
      </Container>
    );
  }
}
