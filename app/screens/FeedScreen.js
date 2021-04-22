import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

import Card from "../components/Card";
import colors from "../config/colors";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import SearchBox from "../components/SearchBox";
import QuickAccessComponentBox from "../components/QuickAccessComponentBox";

import SearchImg from "../assets/original/Search.svg";
import useLocation from "../hooks/useLocation";

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

const ListHeader = () => {
  return (
    <View style={{ marginVertical: 15 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        fadingEdgeLength={50}
        contentContainerStyle={styles.QuickAccessComponent}
      >
        <QuickAccessComponentBox text={"Cameras"} />
        <QuickAccessComponentBox text={"Mobiles"} />
        <QuickAccessComponentBox text={"Cars"} />
        <QuickAccessComponentBox text={"Books"} />
        <QuickAccessComponentBox text={"Appliances"} />
        <QuickAccessComponentBox text={"Laptops"} />
        <QuickAccessComponentBox text={"Kichenware"} />
      </ScrollView>
    </View>
  );
};

const scrollY = new Animated.Value(0);
const diffClamp = Animated.diffClamp(scrollY, 0, 55);
const translateY = diffClamp.interpolate({
  inputRange: [0, 55],
  outputRange: [0, -55],
});
const AnimateBackgroundColour = diffClamp.interpolate({
  inputRange: [0, 55],
  outputRange: [colors.pressing_bg, colors.main_fg],
});

// *MAIN CODE* //

function FeedScreen({ navigation }) {
  const location = useLocation();

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // const { currentUser }
  // console.log(currentUser);

  return (
    <View style={styles.Background}>
      <View style={{ flex: 1, height: Dimensions.get("screen").height }}>
        <Animated.View
          style={[
            styles.MainHeaderContainer,
            {
              transform: [{ translateY: translateY }],
              elevation: 4,
              zIndex: 4,
              backgroundColor: AnimateBackgroundColour,
            },
          ]}
        >
          <Header />
          <View style={{ marginHorizontal: 12 }}>
            <SearchBox icon={<SearchImg />} placeholder={"Search Nearby..."} />
          </View>
          <View
            style={{
              height: 0.5,
              width: Dimensions.get("screen").width,
              backgroundColor: colors.placeholder,
            }}
          />
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
                onPress={() => navigation.navigate("Item", item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={5}
            decelerationRate={"normal"}
            keyboardShouldPersistTaps={"never"}
            ListHeaderComponent={ListHeader}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            contentContainerStyle={{
              paddingTop: 105,
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
    // width: "100%",
    // height: 500,
    // top: 0,
    // right: 0,
    // left: 0,
  },
  QuickAccessComponent: {
    flexDirection: "row",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

// export default connect(null, mapDispatchProps)(FeedScreen);
export default FeedScreen;
