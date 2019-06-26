import React from "react";
import api from "../../services/api";
import Emoji from "react-native-emoji";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import {
  Button,
  ButtonText,
  Container,
  HeaderContainer,
  TitleText,
  MessagesContainer,
  ErrorText,
  SuccessText
} from "./styles";
import { AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class AddPropertySubmitPage extends React.Component {
  state = {
    property: this.props.navigation.getParam("property", null),
    success: "",
    error: "",
    loading: false,
    userToken: null
  };

  componentWillMount() {
    this.fetchUserToken();
  }

  fetchUserToken = async () => {
    const token = await AsyncStorage.getItem("user_token");
    this.setState({ userToken: token });
  };

  renderButtonOrSpinner = () => {
    return this.state.loading ? (
      <LoadingIcon />
    ) : (
      <Button onPress={this.handleAddProperty}>
        <ButtonText>Add Property</ButtonText>
      </Button>
    );
  };

  renderMessages = () => {
    return (
      <MessagesContainer>
        {this.state.error ? <ErrorText>{this.state.error}</ErrorText> : null}
        {this.state.success ? (
          <SuccessText>{this.state.success}</SuccessText>
        ) : null}
      </MessagesContainer>
    );
  };

  handleAddProperty = async () => {
    try {
      const { title, price, address } = this.state.property;
      const { latitude, longitude } = this.state.property.coordinate;

      this.setState({ loading: true });

      const response = await api.post("/properties", {
        title,
        price,
        address,
        latitude,
        longitude,
        token: this.state.userToken
      });

      const id = response.data.property.id;
      const data = new FormData();
      data.append("token", this.state.userToken);

      this.state.property.pictures.map((picture, index) => {
        let random = Math.floor(Math.random() * 1000000) + 1;
        data.append(`image`, {
          name: `${random}${id}${index}.jpg`,
          type: "image/jpeg",
          uri: picture
        });
      });

      const imagesResponse = await api.post(
        `/properties/${id}/images/store`,
        data
      );

      this.setState({
        loading: false,
        success: "Property created successfully! redirecting..."
      });
    } catch (error) {
      this.setState({ loading: false, error: JSON.stringify(error) });
    }
  };

  renderPropertyInfo = () => {};

  renderPropertyLocation = () => {};

  renderPropertyPictures = () => {};

  renderHeader = () => {
    return (
      <HeaderContainer>
        <TitleText>Everything checks ? </TitleText>
        <Emoji name="eyes" style={{ fontSize: 30 }} />
      </HeaderContainer>
    );
  };
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          {this.renderHeader()}
          {this.renderPropertyLocation()}
          {this.renderPropertyInfo()}
          {this.renderPropertyPictures()}
          {this.renderMessages()}
          {this.renderButtonOrSpinner()}
        </Container>
      </ScrollView>
    );
  }
}
