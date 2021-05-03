import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  TouchableNativeFeedback,
  Text,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RFValue } from "react-native-responsive-fontsize";
import * as Location from "expo-location";

import colors from "../config/colors";
import useLocation from "../hooks/useLocation";
import Screen from "./Screen";
import ActivityIndicator from "./ActivityIndicator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateLocation } from "../redux/actions/index";

const Height = Dimensions.get("screen").height;
const Width = Dimensions.get("screen").width;

function Map({ setModalVisibility, ...otherProps }) {
  const location = useLocation();
  const [updateLatitude, setUpdateLatitude] = useState(location.latitude);
  const [updateLongitude, setUpdateLongitude] = useState(location.longitude);
  const [updateCity, setUpdateCity] = useState(location.city);
  const [updateDistrict, setUpdateDistrict] = useState(location.district);

  function isEmpty(obj) {
    let check = 0;
    for (var prop in obj) {
      if (obj[prop] === undefined) check += 1;
    }
    if (check === 0) return false;
    else return true;
  }

  const onPressMap = (coordinate) => {
    setUpdateLatitude(coordinate.latitude);
    setUpdateLongitude(coordinate.longitude);
    Location.reverseGeocodeAsync(coordinate).then((locationInfo) => {
      setUpdateCity(locationInfo[0].city);
      setUpdateDistrict(locationInfo[0].district);
    });
  };

  return isEmpty(location) !== true ? (
    <Modal animationType={"slide"} {...otherProps}>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ height: Height }}
          loadingEnabled={true}
          loadingIndicatorColor={colors.main_fg}
          initialRegion={{
            latitude:
              updateLatitude !== undefined ? updateLatitude : location.latitude,
            longitude:
              updateLongitude !== undefined
                ? updateLongitude
                : location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.012,
          }}
          onLongPress={({ nativeEvent }) => onPressMap(nativeEvent.coordinate)}
        >
          <Marker
            coordinate={{
              latitude:
                updateLatitude !== undefined
                  ? updateLatitude
                  : location.latitude,
              longitude:
                updateLongitude !== undefined
                  ? updateLongitude
                  : location.longitude,
            }}
            pinColor={colors.main_fg}
            title={updateCity !== undefined ? updateCity : location.city}
            description={
              updateDistrict !== undefined ? updateDistrict : location.district
            }
          />
        </MapView>
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
  ) : (
    <Screen>
      <ActivityIndicator visible={true} />
    </Screen>
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

// const mapStateToProps = (store) => ({
//   latitude: store.currentLocationState.latitude,
//   longitude: store.currentLocationState.longitude,
//   city: store.currentLocationState.city,
//   district: store.currentLocationState.district,
// });
// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ updateLocation }, dispatch);

// export default connect(mapStateToProps, mapDispatchProps)(Map);
export default Map;
