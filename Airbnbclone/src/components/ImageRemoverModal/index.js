import React from "react";
import {
  Container,
  ButtonsContainer,
  CancelButton,
  CancelButtonText,
  ConfirmButton,
  ConfirmButtonText,
  ModalText
} from "./styles";

import PropertyPicture from "../PropertyPicture";

const ImageRemoverModal = props => {
  return (
    <Container>
      <ModalText>You want to remove this picture?</ModalText>
      <PropertyPicture path={props.path} />
      <ButtonsContainer>
        <CancelButton onPress={props.onCancelHandler}>
          <CancelButtonText>No</CancelButtonText>
        </CancelButton>
        <ConfirmButton onPress={props.onConfirmHandler}>
          <ConfirmButtonText>Yes</ConfirmButtonText>
        </ConfirmButton>
      </ButtonsContainer>
    </Container>
  );
};

export default ImageRemoverModal;
