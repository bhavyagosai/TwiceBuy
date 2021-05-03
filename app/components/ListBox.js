import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Shadow } from "react-native-shadow-2";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

function ListBox({ icon, text, onPress }) {
  return (
    <View style={{ width: "100%" }}>
      <Shadow
        distance={10}
        startColor={"#00000008"}
        radius={5}
        contentViewStyle={{ marginBottom: 20 }}
      >
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
        >
          <View style={styles.main}>
            <View style={styles.container}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name={icon}
                  size={22}
                  color={colors.main_fg}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 45,
    borderRadius: 5,
    backgroundColor: colors.main_bg,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat",
    color: colors.secondary_text,
    fontSize: RFValue(11.5),
  },
  textContainer: {
    height: "100%",
    justifyContent: "center",
  },
});

export default ListBox;
