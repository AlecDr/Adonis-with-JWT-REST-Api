import React from "react";
import api from "../../services/api";
import MapView from "react-native-maps";
import PropertyDetails from "../../components/PropertyDetails";
import { AsyncStorage, Text, ScrollView } from "react-native";
import Toast from "react-native-root-toast";

export default class PropertyDetailPage extends React.Component {
  state = {
    flex: 0,
    mapIsReady: false,
    userToken: null,
    propertyId: this.props.navigation.getParam("propertyId"),
    property: null
  };

  async componentDidMount() {
    await this.getUserToken();
    this.fetchProperty();
  }

  getUserToken = async () => {
    const userToken = await AsyncStorage.getItem("user_token");
    this.setState({ userToken });
  };

  fetchProperty = async () => {
    try {
      const { userToken } = this.state;

      const response = await api.get(`/properties/${this.state.propertyId}`, {
        params: {
          token: userToken
        }
      });

      let property = response.data;

      property.pictures = property.images.map(image => {
        return `${api.defaults.baseURL}/images/${image.path}`;
      });

      this.setState({ property: property });
    } catch (error) {
      Toast.show(JSON.stringify(error.message), {
        duration: 10000,
        position: Toast.positions.TOP + 45,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "#880e4f",
        delay: 100
      });
    }
  };

  render() {
    return this.state.property ? (
      <ScrollView showsVerticalScrollIndicator={false}>
        <PropertyDetails
          titleText="Property Details"
          property={this.state.property}
        />
      </ScrollView>
    ) : (
      <Text>No Property!</Text>
    );
  }
}
