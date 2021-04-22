import React from "react";

import { View, StyleSheet, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";

// *IMPORT COLORS* //
import colors from "../config/colors";

function SearchBox({ icon, ...otherProps }) {
  // *MAIN CODE* //
  return (
    <View style={{ width: "100%" }}>
      <Shadow
        distance={10}
        startColor={"#00000007"}
        radius={17.5}
        containerViewStyle={{ marginTop: 5, marginBottom: 10 }}
      >
        <View style={SearchBoxStyle.InputBox}>
          <View style={SearchBoxStyle.Icon}>{icon}</View>
          <TextInput style={SearchBoxStyle.textInput} {...otherProps} />
        </View>
      </Shadow>
    </View>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const SearchBoxStyle = StyleSheet.create({
  InputBox: {
    width: "100%",
    height: 35,
    borderRadius: 25,
    flexDirection: "row",
    backgroundColor: colors.pressing_fg,
    overflow: "hidden",
  },
  Icon: {
    marginVertical: 8,
    marginHorizontal: 15,
  },
  textInput: {
    flex: 1,
    fontFamily: "Montserrat",
    fontSize: RFValue(10),
    color: colors.secondary_text,
    width: "100%",
    height: "100%",
  },
});

export default SearchBox;
