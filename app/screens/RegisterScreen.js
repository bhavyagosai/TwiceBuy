import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

// *IMPORT BG CIRCLES CSS* //
import CircleStyles from "../components/CircleStyles";
// *IMPORT INPUT BOX CSS* //
import PrimaryInputBox from "../components/PrimaryInputBox";
// *IMPORT COLORS* //
import colors from "../config/colors";
// *IMPORT SVG IMAGES* //
import Logo from "../assets/original/Logo.svg";
import UserImg from "../assets/original/User.svg";
import EmailImg from "../assets/original/Email.svg";
import CallImg from "../assets/original/Call.svg";
import PasswordImg from "../assets/original/Password.svg";

// *MAIN CODE* //

function RegisterScreen(props) {
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
        <Logo width={139} height={73} style={styles.Logo} />

        {/* SCROLLABLE OBJECT HOLDER */}
        <View style={{ height: 300, width: "100%",}}>
          <ScrollView
            fadingEdgeLength={100}
            showsVerticalScrollIndicator={false}
          >
            {/* INPUT BOXES & TEXTS */}
            <Text style={styles.PrimaryText}>Username</Text>
            <PrimaryInputBox icon={<UserImg />} />

            <Text style={styles.PrimaryText}>Email</Text>
            <PrimaryInputBox icon={<EmailImg />} />

            <Text style={styles.PrimaryText}>Contact Number</Text>
            <PrimaryInputBox icon={<CallImg />} />

            <Text style={styles.PrimaryText}>Password</Text>
            <PrimaryInputBox icon={<PasswordImg />} />

            <Text style={styles.PrimaryText}>Confirm Password</Text>
            <PrimaryInputBox icon={<PasswordImg />} />
          </ScrollView>
        </View>
        
        <Text style={styles.SecondaryText}>Already a User? Log in</Text>

        {/* LOGIN BUTTON IMPLEMENTATION */}
        <TouchableOpacity style={styles.Loginbutton}>
          <Text
            style={{
              fontFamily: "Montserrat",
              fontSize: RFValue(11.5),
              color: colors.pressing_fg,
            }}
          >
            Sign-Up
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
  // *MAIN LOGO CSS* //
  Logo: {
    marginVertical: 20,
    marginHorizontal: 15,
    alignSelf: "flex-start",
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
    marginTop: 15,
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

export default RegisterScreen;
