import React, { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from "react-map-gl";
import styles from "./styles.module.css";

export default props => {
  const [mode, setMode] = React.useState("map");
  const [userLocation, setUserLocation] = React.useState({
    latitude: 37.7577,
    longitude: -120.4376,
    zoom: 8
  });

  let onViewportChange = viewport => {
    let { latitude, longitude, zoom } = viewport;

    setUserLocation({
      latitude,
      longitude,
      zoom
    });
  };

  return (
    <div className={styles.container}>
      <ReactMapGL
        onViewportChange={onViewportChange}
        width="100%"
        height="100%"
        {...userLocation}
        mapboxApiAccessToken="pk.eyJ1IjoiYWxlY2RyIiwiYSI6ImNqd21xeHlnbDBldHk0OGtlc2E0dmExbDEifQ.6j75oBJ1XdFbgbmFc4W7Fw"
      />
    </div>
  );
};
