import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { BoxShadow } from "react-native-shadow";

// *IMPORT WIDTH HANDLER FUNCTION* //
import useComponentWidth from "../config/WidthHandler";
// *IMPORT COLORS* //
import colors from "../config/colors";

function Card({ image, title, subtitle }) {
  const [getWidth, handleWidth] = useComponentWidth();

  const ShadowInputBox = {
    width: getWidth,
    height: 200,
    color: colors.shadow,
    border: 10,
    radius: 25,
    opacity: 0.1,
    x: 0,
    y: 1,
    style: {
      marginBottom: 35,
    },
  };

  return (
    <View style={{ width: "100%" }} onLayout={handleWidth}>
      <BoxShadow setting={ShadowInputBox}>
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
      </BoxShadow>
    </View>
  );
}

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
