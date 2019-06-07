import React from "react";
import Mapbox from "@react-native-mapbox-gl/maps";
import Icon from "react-native-vector-icons/MaterialIcons";

// custom components
import { Container, FindMeButton } from "./styles";

export default class MapPage extends React.Component {
  state = {
    location: [-56.00663, -28.65408]
  };

  componentWillMount() {
    Mapbox.setAccessToken(
      "pk.eyJ1IjoiYWxlY2RyIiwiYSI6ImNqc3hiOTViaDBrNWU0YW14dDA2YjNvdTYifQ.fwUsz-HyzY4STwp9A61G9Q"
    );
  }

  componentDidMount() {
    Mapbox.setTelemetryEnabled(false);
  }

  findMeHandler = async () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: [position.coords.longitude, position.coords.latitude]
      });
    });
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
            animationDuration={2000}
            centerCoordinate={this.state.location}
          />
          <Mapbox.UserLocation />
        </Mapbox.MapView>

        <FindMeButton onPress={this.findMeHandler}>
          <Icon
            style={{ margin: 0, padding: 0 }}
            name="my-location"
            size={30}
            color="#fff"
          />
        </FindMeButton>
      </Container>
    );
  }
}
