import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Header from "../components/Header";
import InfoContaierBox from "../components/InfoContaierBox";
import ItemScreenCard from "../components/ItemScreenCard";
import colors from "../config/colors";
import firebase from "firebase";

import Star from "../assets/original/Star.svg";
import Chat from "../assets/original/Chat2.svg";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import ListBox from "../components/ListBox";
import Firebase from "../components/Firebase";

function ProfileScreen(props) {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    props.fetchUser();
  }, []);

  const navigation = useNavigation();

  const listBox = [
    {
      id: 1,
      title: "My Listings",
      icon: "format-list-bulleted",
      onPress: () => navigation.navigate("myListingsNavigator"),
    },
    {
      id: 2,
      title: "My Account",
      icon: "account",
      onPress: () => navigation.navigate("Profile"),
    },
    {
      id: 3,
      title: "Settings",
      icon: "cog",
      onPress: () => navigation.navigate("Profile"),
    },
  ];

  // const onPressNumber = () => {
  //   firebase
  //     .auth()
  //     .currentUser.updatePhoneNumber(+917016011714)
  //     .then(() => {
  //       alert("done");
  //       console.log(firebase.auth().currentUser.phoneNumber);
  //     });
  // };

  const requestMediaLibraryPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert("You need to enable permissions to access the Library!");
  };

  const requestCameraPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permissions to access the Camera!");
  };

  const selectImage = async () => {
    try {
      const selected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!selected.cancelled) Firebase.changeProfileImage(selected.uri);
    } catch (error) {
      alert("Error reading the image!", error);
    }
  };

  const clickImage = async () => {
    try {
      const selected = await ImagePicker.launchCameraAsync({
        quality: 0.5,
      });
      if (!selected.cancelled) Firebase.changeProfileImage(selected.uri);
    } catch (error) {
      alert("Error reading the image!", error);
    }
  };

  const updateImage = () => {
    requestCameraPermission().then(() => {
      requestMediaLibraryPermission().then(() => {
        Alert.alert("Update", "Do you wish to update your profile picture?", [
          {
            text: "Yes",
            onPress: () => {
              Alert.alert(
                "Select",
                "Do you want to take a picture or upload it from your storage?",
                [
                  { text: "Upload Image", onPress: () => selectImage() },
                  { text: "Open Camera", onPress: () => clickImage() },
                ]
              );
            },
          },
          { text: "No" },
        ]);
      });
    });
  };

  const onPressNumber = (phoneNumber) => {
    let number = `tel:${"+91" + phoneNumber}`;
    Linking.openURL(number);
  };

  const logoutUser = () => {
    Alert.alert("Logout", "Do you want to log out of your account?", [
      {
        text: "Yes",
        onPress: () => {
          Firebase.logout().then(() => {
            alert("User logged out successfully!");
            navigation.navigate("Login");
          });
        },
      },
      { text: "No" },
    ]);
  };

  const ListFooter = () => {
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <TouchableNativeFeedback
          onPress={logoutUser}
          background={TouchableNativeFeedback.Ripple(colors.pressing_fg)}
        >
          <View style={styles.Button}>
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color={colors.pressing_fg}
            />
            <Text style={styles.buttonText}> Log Out</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  return props.currentUser !== null ? (
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
        <View style={styles.listHeaderContainer}>
          <View style={styles.listHeaderLeft}>
            <Text style={styles.mainText}>{props.currentUser.username}</Text>
            <Text
              style={[
                styles.mainText,
                { fontSize: RFValue(8.5), marginTop: 5 },
              ]}
            >
              {props.currentUser.email}
            </Text>
            <TouchableNativeFeedback
              onPress={() => onPressNumber(props.currentUser.number)}
              background={TouchableNativeFeedback.Ripple(colors.pressing_fg)}
            >
              <View style={styles.miniBox}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={styles.MBIconContainer}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={12}
                      color={colors.secondary_text}
                    />
                  </View>
                  <View style={styles.MBTextContainer}>
                    <Text style={styles.smallText}>
                      +91 {props.currentUser.number.toString().substr(0, 3)}-
                      {props.currentUser.number.toString().substr(3, 3)}-
                      {props.currentUser.number.toString().substr(6)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.listHeaderRight}>
            <View style={styles.rightContainer}>
              <TouchableNativeFeedback
                onPress={updateImage}
                background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
                useForeground={true}
              >
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: firebase.auth().currentUser.photoURL }}
                  ></Image>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
        <View style={styles.ContentContainer}>
          <FlatList
            data={listBox}
            keyExtractor={(listBox) => listBox.id.toString()}
            renderItem={({ item }) => (
              <ListBox
                text={item.title}
                icon={item.icon}
                onPress={item.onPress}
              />
            )}
            showsVerticalScrollIndicator={false}
            decelerationRate={"normal"}
            ListFooterComponent={ListFooter}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={props.fetchUser}
                colors={[colors.main_fg]}
                progressBackgroundColor={colors.pressing_bg}
                progressViewOffset={-200}
              />
            }
            contentContainerStyle={{
              paddingTop: 20,
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.main_bg,
  },
  MainHeaderContainer: {
    backgroundColor: colors.pressing_bg,
    elevation: 4,
  },
  listHeaderContainer: {
    flex: 0.4,

    flexDirection: "row",
  },
  listHeaderLeft: {
    flex: 1,
    marginLeft: 30,
    justifyContent: "center",
  },
  miniBox: {
    marginTop: 5,
    height: "11%",
    width: "80%",
    borderRadius: 17.5,
    backgroundColor: colors.pressing_bg,
  },
  MBIconContainer: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  MBTextContainer: {
    height: "100%",
    justifyContent: "center",
  },
  smallText: {
    fontFamily: "Montserrat",
    fontSize: RFValue(8.5),
    color: colors.main_fg,
  },
  listHeaderRight: {
    flex: 1,
  },
  rightContainer: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: colors.pressing_bg,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  MainContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  ContentContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  mainText: {
    fontFamily: "Montserrat",
    fontSize: RFValue(16),
    color: colors.secondary_text,
  },
  Button: {
    marginVertical: 20,
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_fg,
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ProfileScreen);
