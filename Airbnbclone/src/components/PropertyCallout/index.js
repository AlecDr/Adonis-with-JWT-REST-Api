import React from "react";
import { Callout } from "react-native-maps";

// custom components
import {
  Container,
  DetailsButton,
  DetailsButtonText,
  TitleText
} from "./styles";

const PropertyCallout = props => (
  <Callout>
    <Container>
      <TitleText>{props.title}</TitleText>
      <DetailsButton onPress={props.detailsPressHandler}>
        <DetailsButtonText>Details</DetailsButtonText>
      </DetailsButton>
    </Container>
  </Callout>
);

export default PropertyCallout;
