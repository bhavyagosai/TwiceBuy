import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

import { useFormikContext } from "formik";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../config/colors";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableNativeFeedback
      onPress={handleSubmit}
      background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
    >
      <View style={styles.Button}>
        <Text style={styles.Text}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
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

export default SubmitButton;
