import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

// *IMPORT COLORS* //
import colors from "../config/colors";

function Screen({ children }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.main_fg} />
      {children}
    </SafeAreaView>
  );
}

export default Screen;
