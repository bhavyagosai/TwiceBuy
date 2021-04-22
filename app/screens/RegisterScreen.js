import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";
import * as Yup from "yup";
import Firebase from "../components/Firebase";

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
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import AppForm from "../components/AppForm";
import { Formik } from "formik";
import ErrorMessage from "../components/ErrorMessage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ActivityIndicator from "../components/ActivityIndicator";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

// *MAIN CODE* //

function RegisterScreen({ navigation }) {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().email().label("Email"),
    contactNumber: Yup.string()
      .matches(phoneRegExp, "Invalid Phone Number")
      .min(10, "Invalid Phone Number")
      .max(16, "Invalid Phone Number")
      .required()
      .label("Contact Number"),
    password: Yup.string().required().min(8).label("Password"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .label("Password"),
  });

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 5;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const hasReachedTop = ({ contentOffset }) => {
    return contentOffset.y < 5;
  };

  const [renderDChevron, setRenderDChevron] = useState(true);
  const [renderUChevron, setRenderUChevron] = useState(false);

  const handleSubmit = async ({ username, email, password, contactNumber }) => {
    try {
      // const registerationProcess =
      await Firebase.register(username, email, password, contactNumber);
      // if (!registerationProcess)
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
        <Formik
          initialValues={{
            username: "",
            email: "",
            contactNumber: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, errors, setFieldTouched, touched }) => (
            <>
              {/* MAIN LOGO */}
              <Logo width={139} height={73} style={styles.Logo} />

              {/* SCROLLABLE OBJECT HOLDER */}
              <View style={{ height: 300, width: "100%" }}>
                <ScrollView
                  fadingEdgeLength={100}
                  showsVerticalScrollIndicator={false}
                  onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                      setRenderUChevron(true);
                      setRenderDChevron(false);
                    }
                    if (hasReachedTop(nativeEvent)) {
                      setRenderDChevron(true);
                      setRenderUChevron(false);
                    }
                  }}
                >
                  {/* INPUT BOXES & TEXTS */}
                  <Text style={styles.PrimaryText}>Username</Text>
                  <PrimaryInputBox
                    height={50}
                    icon={<UserImg />}
                    autoCapotalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("username")}
                    onChangeText={handleChange("username")}
                    placeholder="username"
                  />
                  <ErrorMessage
                    error={errors["username"]}
                    visible={touched["username"]}
                  />

                  <Text style={styles.PrimaryText}>Email</Text>
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

                  <Text style={styles.PrimaryText}>Contact Number</Text>
                  <PrimaryInputBox
                    height={50}
                    icon={<CallImg />}
                    autoCapotalize="none"
                    autoCorrect={false}
                    // onBlur={() => setFieldTouched("contactNumber")}
                    // onChangeText={
                    //   // if (cardNumber.length === 3) {
                    //   //   setCardNumber(cardNumber + "-");
                    //   // }
                    //   // if (cardNumber.length === 7) {
                    //   //   setCardNumber(cardNumber + "-");
                    //   // }
                    //   handleChange("contactNumber")
                    // }
                    onBlur={() => setFieldTouched("contactNumber")}
                    onChangeText={handleChange("contactNumber")}
                    keyboardType={"phone-pad"}
                    placeholder={"+xx xxx-xxx-xxxx"}
                    // value={cardNumber}
                  />
                  <ErrorMessage
                    error={errors["contactNumber"]}
                    visible={touched["contactNumber"]}
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

                  <Text style={styles.PrimaryText}>Confirm Password</Text>
                  <PrimaryInputBox
                    height={50}
                    icon={<PasswordImg />}
                    autoCapotalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("confirmPassword")}
                    onChangeText={handleChange("confirmPassword")}
                    placeholder={"••••••••••••"}
                    secureTextEntry
                  />
                  <ErrorMessage
                    error={errors["confirmPassword"]}
                    visible={touched["confirmPassword"]}
                  />
                </ScrollView>
                {renderDChevron && (
                  <View style={{ alignItems: "center", opacity: 0.8 }}>
                    <FontAwesome
                      name="chevron-down"
                      size={18}
                      color={colors.main_fg}
                    />
                  </View>
                )}
                {renderUChevron && (
                  <View style={{ alignItems: "center", opacity: 0.8 }}>
                    <FontAwesome
                      name="chevron-up"
                      size={18}
                      color={colors.main_fg}
                    />
                  </View>
                )}
              </View>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={[styles.SecondaryText, { marginTop: 15 }]}>
                  Already a User? Log in
                </Text>
              </TouchableWithoutFeedback>

              {/* SUBMIT BUTTON */}
              <SubmitButton title="Sign-Up" />
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
    color: colors.main_fg,
    fontFamily: "Montserrat",
    fontSize: RFValue(9.2),
    textAlign: "center",
  },
});

export default RegisterScreen;
