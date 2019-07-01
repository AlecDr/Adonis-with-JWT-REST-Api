import React, { useState } from "react";
import Emoji from "react-native-emoji";
import MapView, { Marker } from "react-native-maps";

import PictureList from "../PictureList";
import {
  ScrollView,
  Button,
  ButtonText,
  Container,
  HeaderContainer,
  TitleText,
  MessagesContainer,
  ErrorText,
  SuccessText,
  ImagesContainer,
  SubTitleText,
  PropertyDetailsContainer,
  LabelText,
  DetailText,
  PropertyLocationContainer
} from "./styles";

const PropertyDetails = props => {
  const [flex, setFlex] = useState(0);

  return (
    <Container>
      <HeaderContainer>
        <TitleText>{props.titleText}</TitleText>
        {props.useEmoji ? <Emoji name="eyes" style={{ fontSize: 30 }} /> : null}
      </HeaderContainer>
      <PropertyLocationContainer>
        <SubTitleText>Property Location</SubTitleText>
        <MapView
          region={{
            latitude: props.property.latitude,
            longitude: props.property.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0222
          }}
          style={{ flex }}
          onMapReady={() => setTimeout(() => setFlex(1), 500)}
        >
          {flex ? (
            <Marker
              coordinate={{
                latitude: props.property.latitude,
                longitude: props.property.longitude
              }}
            />
          ) : null}
        </MapView>
      </PropertyLocationContainer>
      <PropertyDetailsContainer>
        <SubTitleText>Details</SubTitleText>
        <LabelText>Title</LabelText>
        <DetailText>{props.property.title}</DetailText>
        <LabelText>Address</LabelText>
        <DetailText>{props.property.address}</DetailText>
        <LabelText>Price</LabelText>
        <DetailText>$ {props.property.price}</DetailText>
      </PropertyDetailsContainer>
      <ImagesContainer>
        <SubTitleText>The pictures</SubTitleText>
        <PictureList pictures={props.property.pictures} />
      </ImagesContainer>
    </Container>
  );
};

export default PropertyDetails;
