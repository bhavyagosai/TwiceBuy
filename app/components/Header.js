import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

// *IMPORT COLORS* //
import colors from "../config/colors";
import useLocation from "../hooks/useLocation";
import * as Location from "expo-location";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateLocation } from "../redux/actions/index";

// *IMPORT SVG IMAGES* //
import Logo from "../assets/original/Logo.svg";
import Map from "../assets/original/Map.svg";

// *MAIN CODE* //

function Header(props) {
  // const getLocation = () => {
  //   Location.requestForegroundPermissionsAsync().then(({ granted }) => {
  //     if (!granted)
  //       alert("You need to enable permissions to access the Library!");
  //     else if (granted)
  //       Location.enableNetworkProviderAsync().then(() => setLocation());
  //   });
  // };
  // const setLocation = () => {
  //   Location.getLastKnownPositionAsync().then((result) => {
  //     Location.reverseGeocodeAsync(result.coords).then((locationInfo) => {
  //       console.log(locationInfo[0].city);
  //       props.updateLocation(
  //         result.coords.latitude,
  //         result.coords.longitude,
  //         locationInfo[0].city,
  //         locationInfo[0].district
  //       );
  //     });
  //   });
  // };

  // console.log(props.city);

  const location = useLocation();

  // console.log(location.city);

  function isEmpty(obj) {
    let check = 0;
    for (var prop in obj) {
      if (obj[prop] === undefined) check += 1;
    }
    if (check === 0) return false;
    else return true;
  }
  // return isEmpty(location) !== true ? (
  return (
    <View style={styles.HeaderContainer}>
      <Logo width={78} height={40} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.LocationText}>{location.city}</Text>
        <Map />
      </View>
    </View>
  );
  // : (
  //   <View style={styles.HeaderContainer}>
  //     <Logo width={78} height={40} />
  //     <View style={{ flexDirection: "row", alignItems: "center" }}>
  //       <Text style={styles.LocationText}>Finding your location</Text>
  //       <Map />
  //     </View>
  //   </View>
  // );
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 5,
  },
  LocationText: {
    fontFamily: "Montserrat",
    color: colors.secondary_text,
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

export default Header;
