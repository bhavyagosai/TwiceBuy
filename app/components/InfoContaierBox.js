import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";

import colors from "../config/colors";
import Map from "./Map";

function InfoContaierBox({ title, profile, icon, subtitle, content, map }) {
  const [mapDisplay, showMapDisplay] = useState(false);

  if (map != null) {
    return (
      <>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Shadow distance={10} startColor={"#00000007"} radius={17.5}>
            <TouchableNativeFeedback
              onPress={() => showMapDisplay(true)}
              background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
            >
              <View style={[styles.Container, { padding: 20, height: 250 }]}>
                <Image style={styles.image} source={map} />
              </View>
            </TouchableNativeFeedback>
          </Shadow>
        </View>
        <Map
          visible={mapDisplay}
          setModalVisibility={(setStatus) => showMapDisplay(setStatus)}
        />
      </>
    );
  } else {
    if (content == null) {
      if (profile == null) {
        return (
          <View style={{ width: "100%", marginBottom: 20 }}>
            <Shadow distance={10} startColor={"#00000007"} radius={17.5}>
              <View style={styles.Container}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.Text}>{title}</Text>
                  <View style={styles.secondaryContainer}>
                    <View style={{ paddingRight: 5 }}>{icon}</View>
                    <Text style={[styles.Text, { color: colors.main_fg }]}>
                      {subtitle}
                    </Text>
                  </View>
                </View>
              </View>
            </Shadow>
          </View>
        );
      } else {
        return (
          <View style={{ width: "100%", marginBottom: 20 }}>
            <Shadow distance={10} startColor={"#00000007"} radius={17.5}>
              <View style={styles.Container}>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.secondaryContainer}>
                    <Text style={[styles.Text, { color: colors.main_fg }]}>
                      {title}
                    </Text>
                    <View style={styles.ImageContainer}>
                      <Image style={styles.image} source={profile} />
                    </View>
                  </View>
                  <View style={styles.secondaryContainer}>
                    <View style={{ paddingRight: 5 }}>{icon}</View>
                    <Text style={[styles.Text, { fontSize: RFValue(10) }]}>
                      {subtitle}
                    </Text>
                  </View>
                </View>
              </View>
            </Shadow>
          </View>
        );
      }
    } else {
      return (
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Shadow distance={10} startColor={"#00000007"} radius={17.5}>
            <View style={[styles.Container, { paddingVertical: 10 }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.Text}>{title}</Text>
                <View style={styles.secondaryContainer}>
                  <View style={{ paddingRight: 5 }}>{icon}</View>
                  <Text style={[styles.Text, { color: colors.main_fg }]}>
                    {subtitle}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.Text,
                  {
                    color: colors.main_fg,
                    fontSize: RFValue(7),
                    textAlign: "justify",
                    marginTop: 5,
                  },
                ]}
              >
                {content}
              </Text>
            </View>
          </Shadow>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.pressing_fg,
    width: "100%",
    minHeight: 35,
    borderRadius: 17.5,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  secondaryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.secondary_text,
  },
  ImageContainer: {
    width: 25,
    height: 25,
    borderRadius: 17.5,
    marginLeft: 5,
    overflow: "hidden",
    backgroundColor: colors.pressing_bg,
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
});

export default InfoContaierBox;
