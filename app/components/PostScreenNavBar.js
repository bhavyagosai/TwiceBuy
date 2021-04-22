import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { BoxShadow } from "react-native-shadow";

// *IMPORT COLORS* //
import colors from "../config/colors";

// *IMPORT SVG IMAGES* //
import Home from "../assets/original/Home.svg";
import Chat from "../assets/original/Chats.svg";
import Favourite from "../assets/original/Favourite.svg";
import Profile from "../assets/original/Profile.svg";
import Plus from "../assets/original/Plus.svg";
import PostScreenModal from "./PostScreenModal";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";

// *MAIN CODE* //

function PostScreenNavBar({
  setImageArray,
  setCategory,
  setIcon,
}) {
  // const navigation = useNavigation();

  return (
    <View style={{ position: "absolute", bottom: 0 }}>
      <View style={{ alignItems: "center", top: 40 }}>
        <BoxShadow setting={ShadowCircle} />
      </View>
      <View>
        <BoxShadow setting={ShadowNavigation}>
          <View style={styles.navigation}>
            {/* <Home style={styles.icon} /> */}
            {/* <Chat style={styles.icon} /> */}
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
              onPress={() => {
                setCategory(null);
                setIcon(null);
                setImageArray([]);
                // setModalVisibility(false);
                // navigation.navigate("FeedNavigator");
              }}
            >
              <View style={styles.containerCircle}>
                <FontAwesome
                  name="check"
                  size={36}
                  color={colors.pressing_fg}
                />
              </View>
            </TouchableNativeFeedback>
            {/* <Favourite style={styles.icon} /> */}
            {/* <Profile style={styles.icon} /> */}
          </View>
        </BoxShadow>
      </View>
    </View>
  );
}

const ShadowNavigation = {
  width: Dimensions.get("screen").width,
  height: 55,
  color: colors.shadow,
  border: 30,
  opacity: 0.06,
  x: 0,
  y: 1,
};

const ShadowCircle = {
  width: 84,
  height: 84,
  color: colors.shadow,
  border: 10,
  radius: 42,
  opacity: 0.05,
  x: 0,
  y: 1,
};

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    height: 55,
    width: Dimensions.get("screen").width,
    backgroundColor: colors.navigationBar,
    justifyContent: "space-around",
    alignItems: "center",
  },
  containerCircle: {
    bottom: 29.5,
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 8,
    borderColor: colors.navigationBar,
    backgroundColor: colors.main_fg,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 25,
  },
});

export default PostScreenNavBar;
