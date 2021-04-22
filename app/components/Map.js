import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableNativeFeedback,
  Text,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../config/colors";
import useLocation from "../hooks/useLocation";

const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

function Map({ setModalVisibility, ...otherProps }) {
  const location = useLocation();

  return (
    <Modal animationType={"slide"} {...otherProps}>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ height: Height }}
          loadingEnabled={true}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.012,
          }}
        ></MapView>
        <View style={styles.buttonContainer}>
          <TouchableNativeFeedback
            onPress={() => setModalVisibility(false)}
            background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
          >
            <View style={styles.Button}>
              <Text style={styles.Text}>Close</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 0.8 * Height,
    left: 0.35 * Width,
  },
  Button: {
    marginVertical: 20,
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_fg,
  },
  Text: {
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
  },
});

export default Map;
