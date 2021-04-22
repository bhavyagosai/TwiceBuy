import React from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";

import Header from "../components/Header";
import InfoContaierBox from "../components/InfoContaierBox";
import ItemScreenCard from "../components/ItemScreenCard";
import NavigationBar from "../components/NavigationBar";
import colors from "../config/colors";

import Star from "../assets/original/Star.svg";
import Chat from "../assets/original/Chat2.svg";

function ItemScreen({ route }) {
  const listing = route.params;

  const containerBoxes = [
    {
      id: 1,
      title: "Price",
      profile: null,
      icon: null,
      subtitle: listing.price,
      content: null,
      map: null,
    },
    {
      id: 2,
      title: "Condition",
      profile: null,
      icon: <Star />,
      subtitle: "4/5",
      content: null,
      map: null,
    },
    {
      id: 3,
      title: "Description",
      profile: null,
      icon: null,
      subtitle: null,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, felis tristique porttitor donec quisque integer massa. Sit in bibendum dapibus ut quam. Sollicitudin et aliquam eleifend semper. Vitae quis tincidunt non a mattis gravida egestas pulvinar justo.Sit in bibendum dapibus ut quam.",
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
      content:
        "237/5, Tirupati Park 2, Bedi Road, Behind Manhattan, Street 388B, New York City, Near Jupiter and Saturn, USA, Earth.",
      map: null,
    },
    {
      id: 6,
      title: null,
      profile: null,
      icon: null,
      subtitle: null,
      content: null,
      map: require("../assets/original/map.png"),
    },
  ];

  const ListHeader = () => {
    return (
      <View style={{ marginBottom: 25 }}>
        <ItemScreenCard image={listing.image} title={listing.title} />
      </View>
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.MainHeaderContainer}>
        <Header />
        <View
          style={{
            height: 0.5,
            width: Dimensions.get("screen").width,
            backgroundColor: colors.placeholder,
          }}
        />
      </View>
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
            // fadingEdgeLength={100}
            decelerationRate={"normal"}
            ListHeaderComponent={ListHeader}
            // onScroll={(e) => {
            //   scrollY.setValue(e.nativeEvent.contentOffset.y);
            // }}
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: 100,
              // backgroundColor: "black"
              // flexGrow: 1,
            }}
          />
          {/* <InfoContaierBox title={"Price"} subtitle={"₹  37,000"} />
          <InfoContaierBox
            title={"Condition"}
            icon={<Star />}
            subtitle={"4/5"}
          />
          <InfoContaierBox
            title={"Description"}
            content={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, felis tristique porttitor donec quisque integer massa. Sit in bibendum dapibus ut quam. Sollicitudin et aliquam eleifend semper. Vitae quis tincidunt non a mattis gravida egestas pulvinar justo.Sit in bibendum dapibus ut quam."
            }
          />
          <InfoContaierBox
            title={"bBSempai"}
            profile={require("../assets/original/bhavya.png")}
            icon={<Chat />}
            subtitle={"Chat with Seller"}
          />
          <InfoContaierBox
            title={"Address"}
            content={
              "237/5, Tirupati Park 2, Bedi Road, Behind Manhattan, Street 388B, New York City, Near Jupiter and Saturn, USA, Earth."
            }
          />
          <InfoContaierBox map={require("../assets/original/map.png")} /> */}
        </View>
      </View>
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.main_bg,
  },
  MainHeaderContainer: {
    backgroundColor: colors.pressing_bg,
  },
  MainContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  ContentContainer: {
    flex: 1,
  },
});

export default ItemScreen;
