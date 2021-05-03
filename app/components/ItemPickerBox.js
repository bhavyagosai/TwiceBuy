import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";
import colors from "../config/colors";

function ItemPickerBox({ item, onPressEvent }) {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.Container}>
        <Shadow distance={10} startColor={"#00000007"} radius={37.5}>
          <TouchableNativeFeedback
            onPress={() => onPressEvent()}
            background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
          >
            <View style={styles.ButtonContainer}>{item.icon}</View>
          </TouchableNativeFeedback>
        </Shadow>
      </View>
      <Text style={styles.Text}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: 75,
    height: 75,
    marginHorizontal: (Dimensions.get("screen").width - 190) / 4,
    marginVertical: 15,
  },
  ButtonContainer: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
    backgroundColor: colors.pressing_fg,
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.main_fg,
  },
});

export default ItemPickerBox;
