import React from "react";
import { View, StyleSheet } from "react-native";
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AddPostButton({ onPress }) {
  return (
    // <TouchableNativeFeedback
    //   background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
    //   onPress={onPress}
    // >
    <View>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <MaterialCommunityIcons
            name="plus"
            size={46}
            color={colors.pressing_fg}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
    // </TouchableNativeFeedback>
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
