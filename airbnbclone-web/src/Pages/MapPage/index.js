import React, { useEffect } from "react";
import { isAuthenticated } from "../../Helpers/Auth";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker
} from "@react-google-maps/api";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";
import api from "../../api/index";
import { FaPlus } from "react-icons/fa";
import PropertyModal from "../../components/PropertyModal";

export default props => {
  const [mode, setMode] = React.useState("home");
  const [mapCenter, setMapCenter] = React.useState({
    lat: 37.7577,
    lng: -120.4376
  });
  const [loading, setLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);
  const [searchInterval, setSearchInterval] = React.useState(null);
  const [tokenLoaded, setTokenLoaded] = React.useState(false);
  const [properties, setProperties] = React.useState([]);
  const [visibleCallout, setVisibleCallout] = React.useState(null);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  let map = React.createRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setMapCenter({ lat: latitude, lng: longitude });
    });
    getUserToken();
  }, []);

  let getUserToken = async () => {
    if (!userToken) {
      setUserToken(isAuthenticated());
      setTokenLoaded(true);
    }
  };

  let detailsButtonHandler = propertyId => {
    setSelectedProperty(propertyId);
    setModalOpen(true);
  };

  let handleModalClose = () => {
    setSelectedProperty(null);
    setModalOpen(false);
  };

  let fetchProperties = async position => {
    if (position) {
      if (!loading) {
        try {
          setLoading(true);
          if (!userToken) {
            await getUserToken();
          }
          const { lat, lng } = position;
          const response = await api.get("/properties", {
            params: {
              token: userToken,
              latitude: lat,
              longitude: lng,
              distance: 10
            }
          });

          if (response.data.length) {
            if (
              JSON.stringify(
                response.data
                  .map(responseProperty => responseProperty.id)
                  .sort()
              ) !==
              JSON.stringify(properties.map(property => property.id).sort())
            )
              setProperties(response.data);
          }

          if (searchInterval != null) {
            clearInterval(searchInterval);
          }
          setSearchInterval(setInterval(() => setLoading(false), 1000));
        } catch (error) {
          setLoading(false);
        }
      }
    }
  };

  let renderAddMarker = () => {};

  let renderCallout = property => {
    if (visibleCallout) {
      if (JSON.stringify(visibleCallout) === JSON.stringify(property))
        return (
          <InfoWindow
            onUnmount={() => {
              setVisibleCallout(null);
            }}
            onCloseClick={() => setVisibleCallout(null)}
            position={{
              lat: property.latitude,
              lng: property.longitude
            }}
          >
            <div className={styles.calloutContainer}>
              <p className={styles.calloutTitle}>{property.title}</p>
              <p className={styles.calloutAddress}>{property.address}</p>
              <p className={styles.calloutPrice}>{property.price} $</p>
              <button
                onClick={() => detailsButtonHandler(property.id)}
                className={styles.calloutButton}
              >
                See details
              </button>
            </div>
          </InfoWindow>
        );
    }
  };

  let renderMarkers = () => {
    if (properties.length) {
      return properties.map((property, index) => (
        <Marker
          onClick={() => setVisibleCallout({ ...property })}
          key={index}
          draggable={false}
          position={{
            lat: property.latitude,
            lng: property.longitude
          }}
        >
          {renderCallout(property)}
        </Marker>
      ));
    }
  };

  let renderSpinner = () =>
    loading ? <img src={logo} className={styles.loader} alt="" /> : null;

  let renderPropertyModal = () =>
    selectedProperty ? (
      <PropertyModal
        userToken={userToken}
        selectedProperty={selectedProperty}
        onClose={handleModalClose}
        open={modalOpen}
      />
    ) : null;

  return (
    <div className={styles.container}>
      {tokenLoaded ? (
        <LoadScript style={{ flex: 1 }} id="script-loader" googleMapsApiKey="">
          <GoogleMap
            onLoad={e => {
              fetchProperties({
                lat: map.current.state.map.center.lat(),
                lng: map.current.state.map.center.lng()
              });
            }}
            mapContainerClassName="App-map"
            center={mapCenter}
            ref={map}
            onCenterChanged={e => {
              fetchProperties({
                lat: map.current.state.map.center.lat(),
                lng: map.current.state.map.center.lng()
              });
            }}
            zoom={16}
            options={{
              streetViewControl: false,
              mapTypeControl: false
            }}
            mapContainerStyle={{ flex: 1 }}
            version="weekly"
            on
          >
            {mode === "home" ? renderMarkers() : renderAddMarker()}
          </GoogleMap>
        </LoadScript>
      ) : null}

      {renderSpinner()}
      <div className={styles.fab}>
        <FaPlus color="white" size="30" />
      </div>

      {renderPropertyModal()}
    </div>
  );
};
