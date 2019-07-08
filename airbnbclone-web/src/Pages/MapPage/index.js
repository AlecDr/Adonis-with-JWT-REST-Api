import React, { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from "react-map-gl";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import styles from "./styles.module.css";

export default props => {
  const [mode, setMode] = React.useState("map");
  const [userLocation, setUserLocation] = React.useState({
    lat: 37.7577,
    long: -120.4376,
    zoom: 8
  });

  let onViewportChange = viewport => {
    let { lat, long, zoom } = viewport;

    setUserLocation({
      lat,
      long,
      zoom
    });
  };

  return (
    <div className={styles.container}>
      <LoadScript
        style={{ flex: 1 }}
        id="script-loader"
        googleMapsApiKey="AIzaSyAcKaRUoIwEeLg_A5zi9ufUnSGfTnCm9qc"
      >
        <GoogleMap
          mapContainerClassName="App-map"
          center={{ lat: 52.52047739093263, lng: 13.36653284549709 }}
          zoom={12}
          mapContainerStyle={{ flex: 1 }}
          version="weekly"
          on
        />
      </LoadScript>
    </div>
  );
};
