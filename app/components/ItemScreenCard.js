import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";

import { FontAwesome5 } from "@expo/vector-icons";
//-----------**************NOT IN USE*************---------------//
// *IMPORT COLORS* //
import colors from "../config/colors";

function ItemScreenCard({ image, title }) {
  // *MAIN CODE* //
  return (
    <View style={{ width: "100%" }}>
      <Shadow
        distance={10}
        startColor={"#00000017"}
        radius={{ topLeft: 25, topRight: 25, bottomLeft: 5, bottomRight: 5 }}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            {image && <Image style={styles.image} source={image} />}
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <View style={styles.FavouriteContainer}>
          <FontAwesome5 name="heart" size={16} color={colors.main_fg} />
          {/* <FontAwesome name="heart" size={16} color={colors.main_fg} /> */}
          {/* <Favourite /> */}
        </View>
      </Shadow>
    </View>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: "100%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    backgroundColor: colors.main_fg,
    // elevation: 16,
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
  FavouriteContainer: {
    position: "absolute",
    bottom: 17,
    right: 20,
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: colors.pressing_bg,
    elevation: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ItemScreenCard;
