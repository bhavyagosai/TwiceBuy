import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BoxShadow } from "react-native-shadow";
import { RFValue } from "react-native-responsive-fontsize";

// *IMPORT COLORS* //
import colors from "../config/colors";

function QuickAccessComponentBox({ text }) {
  const ShadowInputBox = {
    width: 70,
    height: 30,
    color: colors.main_fg,
    border: 15,
    radius: 15,
    opacity: 0.03,
    x: 0,
    y: 1,
    style: {
      marginVertical: 5,
      marginBottom: 15,
    },
  };

  // *MAIN CODE* //

  return (
    <View style={{ width: 70, marginRight: 15}}>
      <BoxShadow setting={ShadowInputBox}>
        <View style={QuickAccessComponentBoxStyle.Box}>
          <Text style={QuickAccessComponentBoxStyle.Text}>{text}</Text>
        </View>
      </BoxShadow>
    </View>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const QuickAccessComponentBoxStyle = StyleSheet.create({
  Box: {
    width: "100%",
    height: 30,
    borderRadius: 25,
    backgroundColor: colors.pressing_fg,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontFamily: "Montserrat",
    color: colors.secondary_text,
    fontSize: RFValue(7),
  },
});

export default QuickAccessComponentBox;
