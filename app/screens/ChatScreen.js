import React from "react";
import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import colors from "../config/colors";

function ChatScreen(props) {
  return (
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
          Coming Soon!
        </Text>
      </View>
    </Screen>
  );
}

export default ChatScreen;
