import React from "react";
import { FlatList, StyleSheet, View, Dimensions, Animated } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-animated-icons";

import Card from "../components/Card";
import colors from "../config/colors";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";

const cards = [
  {
    id: 1,
    image: require("../assets/original/ps5.png"),
    title: "Play Station 5",
    price: "₹  37,000",
  },
  {
    id: 2,
    image: require("../assets/original/ps5.png"),
    title: "Play Station 6",
    price: "₹  37,000",
  },
  {
    id: 3,
    image: require("../assets/original/ps5.png"),
    title: "Play Station 7",
    price: "₹  37,000",
  },
  {
    id: 4,
    image: require("../assets/original/ps5.png"),
    title: "Play Station 8",
    price: "₹  37,000",
  },
  {
    id: 5,
    image: require("../assets/original/ps5.png"),
    title: "Play Station 9",
    price: "₹  37,000",
  },
  {
    id: 6,
    image: require("../assets/original/ps5.png"),
    title: "Play Station 10",
    price: "₹  37,000",
  },
  {
    id: 7,
    image: require("../assets/original/ps5.png"),
    title: "Play Station 11",
    price: "₹  37,000",
  },
];

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

// *MAIN CODE* //

function FavouritesScreen(props) {
  return (
    <View style={styles.Background}>
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            transform: [{ translateY: translateY }],
            elevation: 4,
          }}
        >
          <Animated.View
            style={[
              styles.MainHeaderContainer,
              { backgroundColor: AnimateHeaderBackgroundColour },
            ]}
          >
            <Header />
            <View style={{ marginHorizontal: 12 }}>
              <View style={styles.ListHeaderStyle}>
                <Animated.Text
                  style={[styles.Text, { color: AnimateTextColour }]}
                >
                  Favourites
                </Animated.Text>
                <View style={{marginLeft: 5}}>
                  <Icon
                    name="heart"
                    fontFamily="FontAwesome"
                    fontSize={RFValue(23)}
                    color={AnimateTextColour}
                  />
                </View>
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
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <FlatList
            data={cards}
            keyExtractor={(card) => card.id.toString()}
            renderItem={({ item }) => (
              <Card
                image={item.image}
                title={item.title}
                subtitle={item.price}
              />
            )}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={5}
            decelerationRate={"normal"}
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
  );
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: colors.main_bg,
  },
  MainHeaderContainer: {
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
  Text: {
    fontFamily: "Montserrat",
    fontSize: RFValue(19.2),
  },
});

export default FavouritesScreen;
