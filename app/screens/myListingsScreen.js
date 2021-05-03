import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  RefreshControl,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { LogBox } from "react-native";
import Icon from "react-native-animated-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchmyListings } from "../redux/actions/index";

import Card from "../components/Card";
import colors from "../config/colors";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import { useNavigation } from "@react-navigation/native";

LogBox.ignoreAllLogs(true);

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

function myListingsScreen(props) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    props.fetchmyListings();
  }, []);

  const navigation = useNavigation();

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  return isEmpty(props.myListingItem) !== true ? (
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
                  My Listings
                </Animated.Text>
                {/* <View style={{ marginLeft: 5 }}>
                  <Icon
                    name="format-list-bulleted"
                    fontFamily="MaterialCommunityIcons"
                    fontSize={RFValue(23)}
                    color={AnimateTextColour}
                  />
                </View> */}
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
            data={props.myListingItem}
            keyExtractor={(myListingItem) => myListingItem.id}
            renderItem={({ item }) => (
              <Card
                image={item.imageURL[0]}
                title={item.name}
                subtitle={"₹  " + item.price}
                // displayFavourite={true}
                onPress={() => navigation.navigate("Item", item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={5}
            decelerationRate={"normal"}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={props.fetchmyListings}
                colors={[colors.main_fg]}
                progressBackgroundColor={colors.pressing_bg}
                progressViewOffset={105}
              />
            }
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.loadingText}>
          Looks like you havent put up anything to sell yet!{"\n"}Go sell
          something!
        </Text>
        <Text
          style={[
            styles.loadingText,
            { marginTop: 5, color: colors.secondary_text },
          ]}
          onPress={props.fetchmyListings}
        >
          Tap here to refresh!
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
  loadingText: {
    fontFamily: "Montserrat",
    fontSize: RFValue(12),
    color: colors.main_fg,
    textAlign: "center",
    marginTop: "30%",
  },
});

const mapStateToProps = (store) => ({
  myListingItem: store.myListingItemState.myListingItem,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchmyListings }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(myListingsScreen);
// export default FavouritesScreen;
