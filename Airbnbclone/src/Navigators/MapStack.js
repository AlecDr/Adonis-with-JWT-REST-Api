import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "react-navigation";
import { TouchableOpacity } from "react-native";
import {
  MapPage,
  PropertyDetailsPage,
  AddPropertySelectLocationPage,
  AddPropertyPicturesPage,
  AddPropertyDetailsPage,
  AddPropertySubmitPage
} from "../pages/index";

const MapStack = createStackNavigator({
  MapPage: {
    screen: MapPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#d65154"
        },
        headerTitle: "Map",
        headerLeft: (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Icon
              color="#ffeaeb"
              style={{ fontSize: 30, paddingLeft: 20 }}
              name="menu"
            />
          </TouchableOpacity>
        ),

        headerTintColor: "#ffeaeb"
      };
    }
  },
  PropertyDetailsPage: {
    screen: PropertyDetailsPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Details",
        headerStyle: {
          backgroundColor: "#d65154"
        },
        headerTintColor: "#ffeaeb"
      };
    }
  },
  AddPropertySelectLocationPage: {
    screen: AddPropertySelectLocationPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Select a location",
        headerStyle: {
          backgroundColor: "#d65154"
        },
        headerTintColor: "#ffeaeb"
      };
    }
  },
  AddPropertyPicturesPage: {
    screen: AddPropertyPicturesPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Take some pictures!",
        headerStyle: {
          backgroundColor: "#d65154"
        },
        headerTintColor: "#ffeaeb"
      };
    }
  },
  AddPropertyDetailsPage: {
    screen: AddPropertyDetailsPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Add the property details",
        headerStyle: {
          backgroundColor: "#d65154"
        },
        headerTintColor: "#ffeaeb"
      };
    }
  },
  AddPropertySubmitPage: {
    screen: AddPropertySubmitPage,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Now check the information",
        headerStyle: {
          backgroundColor: "#d65154"
        },
        headerTintColor: "#ffeaeb"
      };
    }
  }
});

export default MapStack;
