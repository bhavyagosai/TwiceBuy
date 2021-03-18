import { enableExpoCliLogging } from "expo/build/logs/Logs";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Button,
  Platform,
  Dimensions,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import Card from "./app/components/Card";
import NavigationBar from "./app/components/NavigationBar";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat: require("./app/assets/fonts/Montserrat-Bold.ttf"),
  });
  console.log("Application execution complete!");

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 20, marginTop: 100 }}>
          <Card
            image={require("./app/assets/original/ps5.png")}
            title={"Play Station 5"}
            subtitle={"₹  37,000"}
          />
          <Card
            image={require("./app/assets/original/ps5.png")}
            title={"Play Station 5"}
            subtitle={"₹  37,000"}
          />
          <Card
            image={require("./app/assets/original/ps5.png")}
            title={"Play Station 5"}
            subtitle={"₹  37,000"}
          />
          <Card
            image={require("./app/assets/original/ps5.png")}
            title={"Play Station 5"}
            subtitle={"₹  37,000"}
          />
        </View>
        <NavigationBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // borderWidth: 3,
    // borderColor: 'red',
    //backgroundColor: "#fff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight :0,
  },
});
