import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import * as Location from "expo-location";

import Screen from "./app/components/Screen";

import colors from "./app/config/colors";

import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import FeedScreen from "./app/screens/FeedScreen";
import Card from "./app/components/Card";
import Header from "./app/components/Header";
import NavigationBar from "./app/components/NavigationBar";
import PrimaryInputBox from "./app/components/PrimaryInputBox";
import SearchBox from "./app/components/SearchBox";

import Search from "./app/assets/original/Search.svg";
import ItemScreen from "./app/screens/ItemScreen";
import PostScreen from "./app/screens/PostScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { lightTheme } from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import FavouritesScreen from "./app/screens/FavouritesScreen";
import PostScreenModal from "./app/components/PostScreenModal";
import ActivityIndicator from "./app/components/ActivityIndicator";
import Firebase from "./app/components/Firebase";
import store from "./app/redux/store/index";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat: require("./app/assets/fonts/Montserrat-Bold.ttf"),
  });
  console.log("Application execution complete!");

  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [givenLocation, setGivenLocation] = useState(false);
  const [location, setLocation] = useState(true);

  useEffect(() => {
    const initialization = Firebase.isInitialized();
    if (initialization) {
      Location.enableNetworkProviderAsync()
        .then(() => {
          setFirebaseInitialized(true);
          setLocation(false);
          setGivenLocation(true);
        })
        .catch((error) => {
          Alert.alert(
            "Wait!",
            "Please enable location services for a better experience\nError: " +
              error,
            [
              {
                text: "Enable services",
                onPress: () => {
                  Location.enableNetworkProviderAsync()
                    .then(() => {
                      setFirebaseInitialized(true);
                      setLocation(false);
                      setGivenLocation(true);
                    })
                    .catch((error) => alert(error));
                },
              },
            ]
          );
        });
    }
    return function cleanup() {
      Firebase.isInitialized();
    };
  }, []);

  if (!fontsLoaded) {
    return (
      <Screen>
        <ActivityIndicator visible={true} />
      </Screen>
    );
  } else {
    return firebaseInitialized !== false ? (
      <Screen>
        {/* <FeedScreen /> */}
        {/* <ItemScreen /> */}
        {/* <LoginScreen /> */}
        {/* <RegisterScreen /> */}
        {/* <FavouritesScreen/> */}
        {/* <PostScreenModal/> */}
        <Provider store={store}>
          <NavigationContainer theme={lightTheme}>
            <AuthNavigator />
          </NavigationContainer>
        </Provider>
      </Screen>
    ) : (
      <Screen>
        <ActivityIndicator visible={true} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {givenLocation && (
            <Text style={styles.text}>
              Fetching all the details{"\n"}Hang on tight!
            </Text>
          )}
          {location && (
            <Text style={styles.text}>Enable locations please!</Text>
          )}
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat",
    fontSize: RFValue(12),
    color: colors.main_fg,
    textAlign: "center",
    marginTop: "30%",
  },
});
