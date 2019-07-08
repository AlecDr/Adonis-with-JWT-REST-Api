import React, { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from "react-map-gl";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import styles from "./styles.module.css";

export default props => {
  const [mode, setMode] = React.useState("map");
  const [userLocation, setUserLocation] = React.useState({
    lat: 37.7577,
    lng: -120.4376
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <div className={styles.container}>
      <LoadScript
        style={{ flex: 1 }}
        id="script-loader"
        googleMapsApiKey="AIzaSyAcKaRUoIwEeLg_A5zi9ufUnSGfTnCm9qc"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={userLocation}
          zoom={12}
          options={{
            streetViewControl: false,
            mapTypeControl: false
          }}
          mapContainerStyle={{ flex: 1 }}
          version="weekly"
          on
        />
      </LoadScript>
    </div>
  );
};
