import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFeedItems, fetchFavouriteItems } from "../redux/actions/index";
import * as Location from "expo-location";

import Card from "../components/Card";
import colors from "../config/colors";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import SearchBox from "../components/SearchBox";
import QuickAccessComponentBox from "../components/QuickAccessComponentBox";

import SearchImg from "../assets/original/Search.svg";
import useLocation from "../hooks/useLocation";

import store from "../redux/store/index";
import Firebase from "../components/Firebase";
import firebase from "firebase";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";

// const cards = [
//   {
//     id: 2,
//     image: require("../assets/original/ps5.png"),
//     title: "Play Station 6",
//     price: "₹  37,000",
//   },
//   {
//     id: 4,
//     image: require("../assets/original/ps5.png"),
//     title: "Play Station 7",
//     price: "₹  37,000",
//   },
//   {
//     id: 5,
//     image: require("../assets/original/ps5.png"),
//     title: "Play Station 8",
//     price: "₹  37,000",
//   },
//   {
//     id: "ello",
//     image: require("../assets/original/ps5.png"),
//     title: "Play Station 5",
//     price: "₹  37,000",
//   },
//   {
//     id: 6,
//     image: require("../assets/original/ps5.png"),
//     title: "Play Station 9",
//     price: "₹  37,000",
//   },
//   {
//     id: 7,
//     image: require("../assets/original/ps5.png"),
//     title: "Play Station 10",
//     price: "₹  37,000",
//   },
//   {
//     id: 8,
//     image: require("../assets/original/ps5.png"),
//     title: "Play Station 11",
//     price: "₹  37,000",
//   },
// ];

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

function FeedScreen(props) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    props.fetchFeedItems();
    props.fetchFavouriteItems();
  }, []);

  const navigation = useNavigation();

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  return isEmpty(props.feedItem) !== true ? (
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
            data={props.feedItem}
            keyExtractor={(feedItem) => feedItem.id}
            renderItem={({ item }) => (
              <Card
                image={item.imageURL[0]}
                title={item.name}
                subtitle={"₹  " + item.price}
                onPress={() => navigation.navigate("Item", item)}
                displayFavourite={true}
                items={item}
                favouriteItems={props.favouriteItem}
              />
            )}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={5}
            decelerationRate={"normal"}
            keyboardShouldPersistTaps={"never"}
            ListHeaderComponent={ListHeader}
            // refreshing={refreshing}
            // onRefresh={props.fetchFeedItems}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={props.fetchFeedItems}
                colors={[colors.main_fg]}
                progressBackgroundColor={colors.pressing_bg}
                progressViewOffset={105}
              />
            }
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
  ) : (
    <Screen>
      <ActivityIndicator visible={true} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "Montserrat",
            fontSize: RFValue(12),
            color: colors.main_fg,
            textAlign: "center",
            marginTop: "30%",
          }}
        >
          Fetching all the details{"\n"}Hang on tight!
        </Text>
      </View>
    </Screen>
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
  },
  QuickAccessComponent: {
    flexDirection: "row",
  },
});

const mapStateToProps = (store) => {
  return {
    feedItem: store.feedItemState.feedItem,
    favouriteItem: store.favouriteItemState.favouriteItem,
  };
};
const mapDispatchProps = (dispatch) => {
  return {
    fetchFeedItems: () => dispatch(fetchFeedItems()),
    fetchFavouriteItems: () => dispatch(fetchFavouriteItems()),
  };
};
export default connect(mapStateToProps, mapDispatchProps)(FeedScreen);
// export default FeedScreen;
