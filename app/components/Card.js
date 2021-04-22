import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";

// *IMPORT COLORS* //
import colors from "../config/colors";

function Card({ image, title, subtitle, onPress }) {
  // *MAIN CODE* //

  return (
    <View style={{ width: "100%" }}>
      <Shadow
        distance={10}
        startColor={"#00000017"}
        radius={25}
        contentViewStyle={{ marginBottom: 35 }}
      >
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
        >
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={image} />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Shadow>
    </View>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: "100%",
    borderRadius: 20,
    backgroundColor: colors.main_fg,
  },
  imageContainer: {
    height: 166,
    width: "100%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  title: {
    marginTop: 5,
    marginLeft: 15,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
  },
  subtitle: {
    marginTop: 5,
    marginRight: 15,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
  },
});

export default Card;
