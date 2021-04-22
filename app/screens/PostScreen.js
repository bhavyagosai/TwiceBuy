// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   FlatList,
//   TouchableWithoutFeedback,
//   TouchableHighlight,
//   TouchableOpacity,
//   TouchableNativeFeedback,
// } from "react-native";
// import { RFValue } from "react-native-responsive-fontsize";
// import { FontAwesome } from "@expo/vector-icons";

// import Header from "../components/Header";
// import InfoContaierBox from "../components/InfoContaierBox";
// import ItemScreenCard from "../components/ItemScreenCard";
// import NavigationBar from "../components/NavigationBar";
// import colors from "../config/colors";

// import Star from "../assets/original/Star.svg";
// import Chat from "../assets/original/Chat2.svg";
// import ImagePickerCard from "../components/ImagePickerCard";
// import InfoPickerBox from "../components/ItemPickerBox";
// import { text } from "../components/ModalView";

// const containerBoxes = [
//   {
//     id: 1,
//     title: "Price",
//     profile: null,
//     icon: <FontAwesome name="rupee" size={15} color={colors.main_fg} />,
//     subtitle: "37,000",
//     content: null,
//     map: null,
//   },
//   {
//     id: 2,
//     title: "Condition",
//     profile: null,
//     icon: <Star />,
//     subtitle: "4/5",
//     content: null,
//     map: null,
//   },
//   {
//     id: 3,
//     title: "Description",
//     profile: null,
//     icon: null,
//     subtitle: null,
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, felis tristique porttitor donec quisque integer massa. Sit in bibendum dapibus ut quam. Sollicitudin et aliquam eleifend semper. Vitae quis tincidunt non a mattis gravida egestas pulvinar justo.Sit in bibendum dapibus ut quam.",
//     map: null,
//   },
//   {
//     id: 4,
//     title: "bBSempai",
//     profile: require("../assets/original/bhavya.png"),
//     icon: <Chat />,
//     subtitle: "Chat with Seller",
//     content: null,
//     map: null,
//   },
//   {
//     id: 5,
//     title: "Address",
//     profile: null,
//     icon: null,
//     subtitle: null,
//     content:
//       "237/5, Tirupati Park 2, Bedi Road, Behind Manhattan, Street 388B, New York City, Near Jupiter and Saturn, USA, Earth.",
//     map: null,
//   },
//   {
//     id: 6,
//     title: null,
//     profile: null,
//     icon: null,
//     subtitle: null,
//     content: null,
//     map: require("../assets/original/map.png"),
//   },
// ];

// const ListHeader = () => {
//   return (
//     <View style={{ marginBottom: 25 }}>
//       {/* <ItemScreenCard
//         image={require("../assets/original/ps5.png")}
//         title={"Play Station 5"}
//       /> */}
//       <ImagePickerCard />
//     </View>
//   );
// };

// function PostScreen(props) {
//   // const [rippleColor, setRippleColor] = useState(randomHexColor());
//   const [content, setContent] = useState(false);

//   return (
//     <View style={styles.background}>
//       <View style={styles.MainHeaderContainer}>
//         <Header />
//         <View
//           style={{
//             height: 0.5,
//             width: Dimensions.get("screen").width,
//             backgroundColor: colors.placeholder,
//           }}
//         />
//       </View>
//       <View style={styles.MainContainer}>
//         <View style={styles.ContentContainer}>
//           <ScrollView>
//             <View style={{ marginTop: 20 }} />
//             {/* <FlatList
//             data={containerBoxes}
//             keyExtractor={(containerBox) => containerBox.id.toString()}
//             renderItem={({ item }) => (
//               <InfoPickerBox
//                 title={item.title}
//                 profile={item.profile}
//                 icon={item.icon}
//                 subtitle={item.subtitle}
//                 content={item.content}
//                 map={item.map}
//               />
//             )}
//             showsVerticalScrollIndicator={false}
//             // fadingEdgeLength={100}
//             decelerationRate={"normal"}
//             ListHeaderComponent={ListHeader}
//             // onScroll={(e) => {
//             //   scrollY.setValue(e.nativeEvent.contentOffset.y);
//             // }}
//             contentContainerStyle={{
//               paddingTop: 20,
//               paddingBottom: 100,
//               // backgroundColor: "black"
//               // flexGrow: 1,
//             }}
//           /> */}
//             {/* <TouchableNativeFeedback
//               onPress={() => {
//                 setRippleColor(randomHexColor());
//                 setRippleOverflow(!rippleOverflow);
//               }}
//               background={TouchableNativeFeedback.Ripple(
//                 rippleColor,
//                 rippleOverflow
//               )}
//             > */}
//             <ImagePickerCard />

//             <InfoPickerBox
//               title={"Price"}
//               onPress={() => {
//                 setContent(true);
//               }}
//             />
//             {/* {content && <text /> && (
//               <InfoContaierBox title={"Price"} subtitle={text} />
//             )} */}
//             <InfoContaierBox
//               title={"Condition"}
//               icon={<Star />}
//               subtitle={"4/5"}
//             />
//             <InfoContaierBox
//               title={"Description"}
//               content={
//                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, felis tristique porttitor donec quisque integer massa. Sit in bibendum dapibus ut quam. Sollicitudin et aliquam eleifend semper. Vitae quis tincidunt non a mattis gravida egestas pulvinar justo.Sit in bibendum dapibus ut quam."
//               }
//             />
//             <InfoContaierBox
//               title={"bBSempai"}
//               profile={require("../assets/original/bhavya.png")}
//               icon={<Chat />}
//               subtitle={"Chat with Seller"}
//             />
//             <InfoContaierBox
//               title={"Address"}
//               content={
//                 "237/5, Tirupati Park 2, Bedi Road, Behind Manhattan, Street 388B, New York City, Near Jupiter and Saturn, USA, Earth."
//               }
//             />
//             <InfoPickerBox
//               map={require("../assets/original/map.png")}
//               onPress={() => {
//                 setContent(true);
//               }}
//             />
//             <InfoContaierBox map={require("../assets/original/map.png")} />
//             <InfoContaierBox map={require("../assets/original/map.png")} />
//             <InfoContaierBox map={require("../assets/original/map.png")} />

//             <View style={{ marginBottom: 100 }} />
//           </ScrollView>
//         </View>
//       </View>
//       <NavigationBar />
//     </View>
//   );
// }

// // const randomHexColor = () => {
// //   return "#000000".replace(/0/g, function () {
// //     return (~~(Math.random() * 16)).toString(16);
// //   });
// // };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     backgroundColor: colors.main_bg,
//   },
//   MainHeaderContainer: {
//     backgroundColor: colors.pressing_bg,
//   },
//   MainContainer: {
//     flex: 1,
//     paddingHorizontal: 22,
//   },
//   ContentContainer: {
//     flex: 1,
//     // paddingTop: 20,
//     // paddingBottom: 100,
//   },
// });

// export default PostScreen;
