import React from "react";

import { View, StyleSheet } from "react-native";
import { BoxShadow } from "react-native-shadow";

// *IMPORT WIDTH HANDLER FUNCTION* //
import useComponentWidth from "../config/WidthHandler";
// *IMPORT COLORS* //
import colors from "../config/colors";

// *GET DYNAMIC WIDTH OF PARENT CONTAINER* //
function PrimaryInputBox({ icon }) {
  const [getWidth, handleWidth] = useComponentWidth();

  const ShadowInputBox = {
    width: getWidth,
    height: 50,
    color: colors.main_fg,
    border: 15,
    radius: 25,
    opacity: 0.03,
    x: 0,
    y: 1,
    style: {
      marginVertical: 5,
      marginBottom: 15,
    },
  };

  return (
    <View style={{ width: "100%" }} onLayout={handleWidth}>
      <BoxShadow setting={ShadowInputBox}>
        <View style={PrimaryInputBoxStyle.InputBox}>
          <View style={PrimaryInputBoxStyle.Icon}>{icon}</View>
        </View>
      </BoxShadow>
    </View>
  );
}

const PrimaryInputBoxStyle = StyleSheet.create({
  InputBox: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.pressing_fg,
  },
  Icon: {
    marginVertical: 15.5,
    marginHorizontal: 15,
  },
});

export default PrimaryInputBox;
