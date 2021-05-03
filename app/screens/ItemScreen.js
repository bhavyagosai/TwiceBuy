import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Animated,
  Text,
  TouchableNativeFeedback,
  Modal,
  Image,
} from "react-native";

import Header from "../components/Header";
import InfoContaierBox from "../components/InfoContaierBox";
import ItemScreenCard from "../components/ItemScreenCard";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";

import Star from "../assets/original/Star.svg";
import Chat from "../assets/original/Chat2.svg";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import { RFValue } from "react-native-responsive-fontsize";

const scrollY = new Animated.Value(0);
const diffClamp = Animated.diffClamp(scrollY, 0, 55);
const translateY = diffClamp.interpolate({
  inputRange: [0, 55],
  outputRange: [0, -55],
});
const AnimateHeaderBackgroundColour = diffClamp.interpolate({
  inputRange: [0, 55],
  outputRange: [colors.pressing_bg, colors.main_fg],
});
const AnimateTextColour = diffClamp.interpolate({
  inputRange: [0, 55],
  outputRange: [colors.main_fg, colors.pressing_bg],
});

function ItemScreen({ route }) {
  const listing = route.params;

  const containerBoxes = [
    {
      id: 1,
      title: "Price",
      profile: null,
      icon: null,
      subtitle: "₹  " + listing.price,
      content: null,
      map: null,
    },
    {
      id: 2,
      title: "Condition",
      profile: null,
      icon: <Star />,
      subtitle: listing.condition + "/5",
      content: null,
      map: null,
    },
    {
      id: 3,
      title: "Description",
      profile: null,
      icon: null,
      subtitle: null,
      content: listing.description,
      map: null,
    },
    {
      id: 4,
      title: "bBSempai",
      profile: require("../assets/original/bhavya.png"),
      icon: <Chat />,
      subtitle: "Chat with Seller",
      content: null,
      map: null,
    },
    {
      id: 5,
      title: "Address",
      profile: null,
      icon: null,
      subtitle: null,
      content: listing.address,
      map: null,
    },
    {
      id: 6,
      title: null,
      profile: null,
      icon: null,
      subtitle: null,
      content: null,
      map: true,
    },
  ];

  const width = Dimensions.get("screen").width;

  const ListHeader = () => {
    return (
      <View style={{ marginBottom: 25 }}>
        <View
          style={{
            position: "absolute",
            // opacity: 0.8,
            top: "55%",
            left: 0.84 * width,
            zIndex: 4,
          }}
        >
          <FontAwesome
            name="chevron-right"
            size={18}
            color={colors.pressing_fg}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // fadingEdgeLength={20}
        >
          <View style={{ flexDirection: "row" }}>
            {listing.imageURL.map((uri) => (
              <ItemScreenCard image={uri} key={uri} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return listing !== null ? (
    <View style={styles.background}>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          elevation: 4,
        }}
      >
        <Animated.View
          style={[
            styles.ScrollableContainer,
            { backgroundColor: AnimateHeaderBackgroundColour },
          ]}
        >
          <Header />
          <View style={{ marginHorizontal: 12 }}>
            <View style={styles.ListHeaderStyle}>
              <Animated.Text
                style={[
                  {
                    fontFamily: "Montserrat",
                    fontSize: RFValue(15),
                    textAlign: "center",
                  },
                  { color: AnimateTextColour },
                ]}
              >
                {listing.name}
              </Animated.Text>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              width: Dimensions.get("screen").width,
              backgroundColor: colors.placeholder,
            }}
          />
        </Animated.View>
      </Animated.View>
      <View style={styles.MainContainer}>
        <View style={styles.ContentContainer}>
          <FlatList
            data={containerBoxes}
            keyExtractor={(containerBox) => containerBox.id.toString()}
            renderItem={({ item }) => (
              <InfoContaierBox
                title={item.title}
                profile={item.profile}
                icon={item.icon}
                subtitle={item.subtitle}
                content={item.content}
                map={item.map}
              />
            )}
            showsVerticalScrollIndicator={false}
            decelerationRate={"fast"}
            ListHeaderComponent={ListHeader}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            contentContainerStyle={{
              paddingTop: 125,
              paddingBottom: 100,
            }}
          />
        </View>
      </View>
    </View>
  ) : (
    <Screen>
      <ActivityIndicator visible={true} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.main_bg,
  },
  ScrollableContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  ListHeaderStyle: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  MainHeaderContainer: {
    backgroundColor: colors.pressing_bg,
    elevation: 4,
  },
  MainContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  ContentContainer: {
    flex: 1,
  },
  text: {
    fontFamily: "Montserrat",
    fontSize: RFValue(16),
    color: colors.main_fg,
    marginBottom: 20,
  },
});

export default ItemScreen;
