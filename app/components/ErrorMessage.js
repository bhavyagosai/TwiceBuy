import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import { RFValue } from "react-native-responsive-fontsize";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.Text}>{error}</Text>;
}

const styles = StyleSheet.create({
  Text: {
    color: colors.error_message,
    fontFamily: "Montserrat",
    fontSize: RFValue(9.2),
    textAlign: "center",
  },
});

export default ErrorMessage;
