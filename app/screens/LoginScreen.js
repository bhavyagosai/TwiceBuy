import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

// *IMPORT BG CIRCLES CSS* //
import CircleStyles from "../components/CircleStyles";
// *IMPORT INPUT BOX CSS* //
import PrimaryInputBox from "../components/PrimaryInputBox";
// *IMPORT COLORS* //
import colors from "../config/colors";
// *IMPORT SVG IMAGES* //
import Logo from "../assets/original/Logo.svg";
import EmailImg from "../assets/original/Email.svg";
import PasswordImg from "../assets/original/Password.svg";

// *MAIN CODE* //

function LoginScreen(props) {
  return (
    // *BG HOLDER* //
    <View style={styles.background}>
      {/* CIRCLES STYLE IMPLEMENTATION */}
      <View style={CircleStyles.circleTopLeft} />
      <View style={CircleStyles.circleTopRight} />
      <View style={CircleStyles.circleBottomLeft} />
      <View style={CircleStyles.circleBottomSmall} />

      {/* MAIN HOLDER  */}
      <View style={styles.main}>
        {/* MAIN LOGO */}
        <Logo style={{ marginVertical: 20 }} />

        {/* INPUT BOXES & TEXTS */}
        <Text style={styles.PrimaryText}>Email</Text>
        <PrimaryInputBox icon={<EmailImg />} />

        <Text style={styles.PrimaryText}>Password</Text>
        <PrimaryInputBox icon={<PasswordImg />} />

        {/* INLINE STYLE TO DISPLAY SMALL TEXTS SIDE BY SIDE */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Text style={styles.SecondaryText}>New User? Sign Up</Text>
          <Text style={styles.SecondaryText}>Forgot your password?</Text>
        </View>

        {/* LOGIN BUTTON IMPLEMENTATION */}
        <TouchableOpacity style={styles.Loginbutton}>
          <Text
            style={{
              fontFamily: "Montserrat",
              fontSize: RFValue(11.5),
              color: colors.pressing_fg,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  // *MAIN BG CSS* //
  background: {
    flex: 1,
    backgroundColor: colors.main_bg,
  },
  // *MAIN HOLDER CSS* //
  main: {
    flex: 1,
    margin: 30,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  // *TEXT CSS DEFINITIONS* //
  PrimaryText: {
    alignSelf: "flex-start",
    marginLeft: 15,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.main_fg,
  },
  SecondaryText: {
    color: colors.main_fg,
    fontFamily: "Montserrat",
    fontSize: RFValue(9.2),
  },
  // *LOGIN BUTTON CSS IMPLEMENTATIONS* //
  Loginbutton: {
    marginVertical: 20,
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_fg,
  },
});

export default LoginScreen;
