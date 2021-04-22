import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Yup from "yup";

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
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import AppForm from "../components/AppForm";
import { Formik } from "formik";
import ErrorMessage from "../components/ErrorMessage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Firebase from "../components/Firebase";

// *MAIN CODE* //

function LoginScreen({ navigation }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
  });

  const handleSubmit = async ({ email, password }) => {
    try {
      // const loginProcess =
      await Firebase.login(email, password);
      // if (!loginProcess)
      //   return (
      //     <View>
      //       <ActivityIndicator visible={true} />
      //     </View>
      //   );
      // else
      navigation.navigate("MainApp");
    } catch (error) {
      alert(error.message);
    }
  };

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
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, errors, setFieldTouched, touched }) => (
            <>
              <PrimaryInputBox
                height={50}
                icon={<EmailImg />}
                autoCapotalize="none"
                autoCorrect={false}
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
                placeholder={"abc@company.com"}
                keyboardType={"email-address"}
              />
              <ErrorMessage
                error={errors["email"]}
                visible={touched["email"]}
              />

              <Text style={styles.PrimaryText}>Password</Text>
              <PrimaryInputBox
                height={50}
                icon={<PasswordImg />}
                autoCapotalize="none"
                autoCorrect={false}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
                placeholder={"••••••••••••"}
                secureTextEntry
              />
              <ErrorMessage
                error={errors["password"]}
                visible={touched["password"]}
              />

              {/* INLINE STYLE TO DISPLAY SMALL TEXTS SIDE BY SIDE */}
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.SecondaryText}>New User? Sign Up</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <Text style={styles.SecondaryText}>
                    Forgot your password?
                  </Text>
                </TouchableWithoutFeedback>
              </View>

              {/* SUBMIT BUTTON */}
              <SubmitButton title={"Login"} />
            </>
          )}
        </Formik>
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
});

export default LoginScreen;
