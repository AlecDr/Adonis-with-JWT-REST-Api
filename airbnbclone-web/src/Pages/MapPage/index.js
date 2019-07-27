import React, { useEffect } from "react";
import { isAuthenticated } from "../../Helpers/Auth";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker
} from "@react-google-maps/api";
import styles from "./styles.module.css";
import logo from "../../assets/images/logo.png";
import api from "../../api/index";
import { FaPlus, FaCheck, FaTimes, FaSearchLocation } from "react-icons/fa";
import PropertyModal from "../../components/PropertyModal";
import AddPropertyModal from "../../components/AddPropertyModal";

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
  const [
    propertyDetailsModalOpen,
    setPropertyDetailsModalOpen
  ] = React.useState(false);
  const [addPropertymodalOpen, setAddPropertymodalOpen] = React.useState(false);
  const [addMarkerPosition, setAddMarkerPosition] = React.useState(null);
  const [map, setMap] = React.useState(null);

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

  let onSuccessAdd = () => {
    setMode("home");
    setAddPropertymodalOpen(false);
    fetchProperties({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
  };

  let detailsButtonHandler = propertyId => {
    setSelectedProperty(propertyId);
    setPropertyDetailsModalOpen(true);
  };

  let handleModalClose = () => {
    setSelectedProperty(null);
    setPropertyDetailsModalOpen(false);
  };

  let handleAddModalClose = () => {
    setMode("home");
    setAddPropertymodalOpen(false);
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
          } else {
            setProperties([]);
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

  let findMarker = () => {
    setAddMarkerPosition({
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    });
  };

  let renderAddMarker = () => {
    if (!addMarkerPosition) {
      setAddMarkerPosition({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
      });
    }

    return (
      <Marker
        onDragEnd={e =>
          setAddMarkerPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          })
        }
        draggable
        position={addMarkerPosition}
      />
    );
  };

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
        open={propertyDetailsModalOpen}
      />
    ) : null;

  let renderAddPropertyModal = () => (
    <AddPropertyModal
      onSuccess={onSuccessAdd}
      markerPosition={addMarkerPosition}
      userToken={userToken}
      selectedProperty={selectedProperty}
      onClose={handleAddModalClose}
      open={addPropertymodalOpen}
    />
  );
  let renderFabs = () =>
    mode === "home" ? (
      <div className={styles.fabsContainer}>
        <div onClick={() => setMode("add")} className={styles.addFab}>
          <FaPlus color="white" size="30" />
        </div>
      </div>
    ) : (
      <div className={styles.fabsContainer}>
        <div
          onClick={() => setAddPropertymodalOpen(true)}
          className={styles.addFab}
        >
          <FaCheck color="white" size="30" />
        </div>
        <div onClick={findMarker} className={styles.helpFab}>
          <FaSearchLocation color="white" size="30" />
        </div>
        <div onClick={() => setMode("home")} className={styles.cancelFab}>
          <FaTimes color="white" size="30" />
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      {tokenLoaded ? (
        <LoadScript style={{ flex: 1 }} id="script-loader" googleMapsApiKey="">
          <GoogleMap
            onLoad={e => {
              setMap(e);
              fetchProperties({
                lat: e.getCenter().lat(),
                lng: e.getCenter().lng()
              });
            }}
            mapContainerClassName="App-map"
            center={mapCenter}
            onc
            onCenterChanged={() => {
              return mode === "home"
                ? fetchProperties({
                    lat: map.getCenter().lat(),
                    lng: map.getCenter().lng()
                  })
                : null;
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
      {renderFabs()}
      {renderAddPropertyModal()}
      {renderPropertyModal()}
    </div>
  );
};
