import React, { useState, useEffect } from "react";
import {} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./app/redux/reducers";
import thunk from "redux-thunk";

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

// const store = createStore(rootReducers, applyMiddleware(thunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat: require("./app/assets/fonts/Montserrat-Bold.ttf"),
  });
  console.log("Application execution complete!");

  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  // useEffect(() => {
  //   const initialization = firebase.default
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //       if (user) setFirebaseInitialized(true);
  //     });
  //   return function cleanup() {
  //     initialization();
  //   };
  // }, []);

  useEffect(() => {
    const initialization = Firebase.isInitialized();
    if (initialization) setFirebaseInitialized(true);
    return function cleanup() {
      initialization();
    };
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return firebaseInitialized !== false ? (
      <Screen>
        {/* <View
        style={{
          flex: 1,
          backgroundColor: "#e5e5e5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width : "100%" }}>
          <SearchBox icon={<Search />} />
        </View>
      </View> */}
        {/* <Provider store={store}>
          <FeedScreen />
        </Provider> */}
        {/* <ItemScreen /> */}
        {/* <LoginScreen /> */}
        {/* <RegisterScreen /> */}
        {/* <FavouritesScreen/> */}
        {/* <PostScreenModal/> */}
        {/* <Provider store={store}> */}
        <NavigationContainer theme={lightTheme}>
          <AuthNavigator />
        </NavigationContainer>
        {/* </Provider> */}
      </Screen>
    ) : (
      <Screen>
        <ActivityIndicator visible={true} />
      </Screen>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     //flex: 1,
//     // borderWidth: 3,
//     // borderColor: 'red',
//     //backgroundColor: "#fff",
//     // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight :0,
//   },
// });
