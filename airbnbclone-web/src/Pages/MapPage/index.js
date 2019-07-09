import React, { useEffect } from "react";
import { isAuthenticated } from "../../Helpers/Auth";
import { AuthContext } from "../../Context/AuthContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";
import api from "../../api/index";

export default props => {
  // const [mode, setMode] = React.useState("map");
  const [mapCenter, setMapCenter] = React.useState({
    lat: 37.7577,
    lng: -120.4376
  });
  const [loading, setLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState();
  const [searchInterval, setSearchInterval] = React.useState(null);
  const [properties, setProperties] = React.useState([]);

  let map = React.createRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setMapCenter({ lat: latitude, lng: longitude });
    });

    fetchProperties();
  }, []);

  let getUserToken = () => {
    if (!userToken) setUserToken(isAuthenticated());
  };

  let fetchProperties = async () => {
    if (!loading) {
      try {
        setLoading(true);
        if (!userToken) getUserToken();

        const { lat, lng } = mapCenter;

        const response = await api.get("/properties", {
          params: {
            token: userToken,
            latitude: lat,
            longitude: lng,
            distance: 10
          }
        });

        setProperties(response.data);
        if (searchInterval != null) {
          clearInterval(searchInterval);
        }
        setSearchInterval(setInterval(() => setLoading(false), 1000));
      } catch (error) {
        setLoading(false);
      }
    }
  };

  let renderMarkers = () => {};

  let renderSpinner = () =>
    loading ? <img src={logo} className={styles.loader} /> : null;

  return (
    <div className={styles.container}>
      <LoadScript
        style={{ flex: 1 }}
        id="script-loader"
        googleMapsApiKey="AIzaSyAcKaRUoIwEeLg_A5zi9ufUnSGfTnCm9qc"
      >
        <GoogleMap
          onLoad={renderMarkers}
          mapContainerClassName="App-map"
          center={mapCenter}
          ref={map}
          onCenterChanged={e => {
            setMapCenter({
              lat: map.current.state.map.center.lat(),
              lng: map.current.state.map.center.lng()
            });
            fetchProperties();
          }}
          zoom={16}
          options={{
            streetViewControl: false,
            mapTypeControl: false
          }}
          mapContainerStyle={{ flex: 1 }}
          version="weekly"
          on
        />
      </LoadScript>
      {renderSpinner()}
    </div>
  );
};
