import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Modal,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";
// *IMPORT COLORS* //
import colors from "../config/colors";
import Screen from "./Screen";

function ItemScreenCard({ image }) {
  const [modal, setModal] = useState(false);

  const screenWidth = Dimensions.get("screen").width;

  // *MAIN CODE* //
  return (
    <>
      <View style={{ width: 0.9 * screenWidth, marginRight: 20 }}>
        <Shadow distance={10} startColor={"#00000017"} radius={20}>
          <TouchableNativeFeedback
            onPress={() => {
              setModal(true);
            }}
            background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
            useForeground={true}
          >
            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
          </TouchableNativeFeedback>
        </Shadow>
      </View>
      {modal && (
        <Modal animationType={"slide"}>
          <Screen>
            <View style={styles.modalContainer}>
              <View>
                <TouchableNativeFeedback
                  onPress={() => {
                    setModal(false);
                  }}
                  background={TouchableNativeFeedback.Ripple(
                    colors.pressing_bg
                  )}
                >
                  <View style={styles.Button}>
                    <Text style={styles.buttonText}>Close</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <Image style={styles.modalImage} source={{ uri: image }} />
            </View>
          </Screen>
        </Modal>
      )}
    </>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: "100%",
    borderRadius: 20,
    backgroundColor: colors.main_fg,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  modalImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
  },
  Button: {
    marginVertical: 20,
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_fg,
  },
  buttonText: {
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
  },
});

export default ItemScreenCard;
