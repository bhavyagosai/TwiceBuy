import React from "react";
import { StyleSheet, View, Text } from "react-native";

// *IMPORT COLORS* //
import colors from "../config/colors";

// *IMPORT SVG IMAGES* //
import Logo from "../assets/original/Logo.svg";
import Map from "../assets/original/Map.svg";

// *MAIN CODE* //

function Header(props) {
  return (
    <View style={styles.HeaderContainer}>
      <Logo width={78} height={40} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.LocationText}>Ahmedabad</Text>
        <Map />
      </View>
    </View>
  );
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
    elevation: 5
  },
  LocationText: {
    fontFamily: "Montserrat",
    color: colors.secondary_text,
  },
});

export default Header;
