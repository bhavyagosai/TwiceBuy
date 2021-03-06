import React from "react";

import { View, StyleSheet, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";

// *IMPORT WIDTH HANDLER FUNCTION* //
import useComponentWidth from "../config/WidthHandler";
// *IMPORT COLORS* //
import colors from "../config/colors";

// *GET DYNAMIC WIDTH OF PARENT CONTAINER* //
function PrimaryInputBox({ icon, height="50", ...otherProps }) {
  // *MAIN CODE* //

  return (
    <View style={{ width: "100%" }}>
      <Shadow
        distance={10}
        startColor={"#00000007"}
        radius={17.5}
        containerViewStyle={{ marginTop: 5, marginBottom: 10 }}
      >
        <View style={[PrimaryInputBoxStyle.InputBox, {height}]}>
          <View style={PrimaryInputBoxStyle.Icon}>{icon}</View>
          <TextInput style={PrimaryInputBoxStyle.textInput} {...otherProps} />
        </View>
      </Shadow>
    </View>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const PrimaryInputBoxStyle = StyleSheet.create({
  InputBox: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 25,
    backgroundColor: colors.pressing_fg,
    overflow: "hidden",
  },
  Icon: {
    marginVertical: 15.5,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    flex: 1,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.secondary_text,
    width: "100%",
    height: "100%",
  },
});

export default PrimaryInputBox;
