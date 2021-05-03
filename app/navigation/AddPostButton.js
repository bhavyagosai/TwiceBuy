import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AddPostButton({ onPress, icon }) {
  return (
    <View>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <MaterialCommunityIcons
            name={icon}
            size={46}
            color={colors.pressing_fg}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main_fg,
    height: 84,
    width: 84,
    bottom: 40,
    borderWidth: 8,
    borderRadius: 42,
    borderColor: colors.pressing_bg,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddPostButton;
