import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Progress from "react-native-progress";
import firebase from "firebase";
import LottieView from "lottie-react-native";

import { fetchUser } from "../redux/actions/index";

import Header from "../components/Header";
import colors from "../config/colors";

import ErrorMessage from "./ErrorMessage";
import PrimaryInputBox from "./PrimaryInputBox";
import { Formik } from "formik";
import * as Yup from "yup";
import SpecialInputBox from "./SpecialInputBox";
import ModalSubmitButton from "./ModalSubmitButton";
import InfoContaierBox from "./InfoContaierBox";
import FormImagePicker from "./FormImagePicker";
import FormSpecialInputBox from "./FormSpecialInputBox";
import useLocation from "../hooks/useLocation";
import SubmitButton from "./SubmitButton";
import Firebase from "./Firebase";
import Screen from "./Screen";
import ActivityIndicator from "./ActivityIndicator";

function PostScreenModal(props) {
  // const location = useLocation();
  const [loadingLength, setLoadingLength] = useState(0);
  const [loadingNumber, setLoadingNumber] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [animationVisibility, setAnimationVisibility] = useState(false);
  useEffect(() => {
    props.fetchUser();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name of Item"),
    price: Yup.string().required().label("Price"),
    condition: Yup.string().required().min(1).max(1).label("Condition"),
    description: Yup.string().required().max(1024).label("Description"),
    address: Yup.string().required().max(1024).label("Address"),
    // category: Yup.object().required().nullable().label("Category"),
    images: Yup.array()
      .min(1, "Please select at least one image")
      .max(5, "Can upload upto 5 images"),
  });
  const PickerBoxes = [
    {
      value: 1,
      label: "Cameras",
      icon: <FontAwesome name="camera" size={35} color={colors.main_fg} />,
      defaultIcon: (
        <FontAwesome name="camera" size={15} color={colors.main_fg} />
      ),
    },
    {
      value: 2,
      label: "Mobiles",
      icon: <FontAwesome name="mobile" size={55} color={colors.main_fg} />,
      defaultIcon: (
        <FontAwesome name="mobile" size={20} color={colors.main_fg} />
      ),
    },
    {
      value: 3,
      label: "Cars",
      icon: <FontAwesome name="car" size={35} color={colors.main_fg} />,
      defaultIcon: <FontAwesome name="car" size={15} color={colors.main_fg} />,
    },
    {
      value: 4,
      label: "Books",
      icon: <FontAwesome name="book" size={40} color={colors.main_fg} />,
      defaultIcon: <FontAwesome name="book" size={15} color={colors.main_fg} />,
    },
    {
      value: 5,
      label: "Appliances",
      icon: <FontAwesome name="bolt" size={35} color={colors.main_fg} />,
      defaultIcon: <FontAwesome name="bolt" size={15} color={colors.main_fg} />,
    },
    {
      value: 6,
      label: "Laptops",
      icon: <Entypo name="laptop" size={35} color={colors.main_fg} />,
      defaultIcon: <Entypo name="laptop" size={15} color={colors.main_fg} />,
    },
    {
      value: 7,
      label: "Kitchenware",
      icon: <MaterialIcons name="kitchen" size={40} color={colors.main_fg} />,
      defaultIcon: (
        <MaterialIcons name="kitchen" size={15} color={colors.main_fg} />
      ),
    },
    {
      value: 8,
      label: "Others",
      icon: <FontAwesome name="question" size={45} color={colors.main_fg} />,
      defaultIcon: (
        <FontAwesome name="question" size={15} color={colors.main_fg} />
      ),
    },
  ];

  const [category, setCategory] = useState();
  const [icon, setIcon] = useState();

  let imageURLArray = [];

  const uploadItem = async (
    name,
    price,
    condition,
    description,
    address,
    images,
    index
  ) => {
    setLoadingLength(0);
    setLoadingNumber(0);
    const response = await fetch(images[index]);
    const blob = await response.blob();

    var uploadTask = firebase.storage().ref().child(images[index]).put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes;
        // alert("Upload is " + progress + "% done");
        setLoadingLength(progress);
        setLoadingNumber(Math.round(progress * 100));
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            // alert("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            // alert("Upload is running");
            break;
        }
      },
      (error) => {
        alert("An error occured! Please try again. Error code: ", error.code);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((imageURL) => {
            imageURLArray.push(imageURL);
            if (index < images.length - 1) {
              uploadItem(
                name,
                price,
                condition,
                description,
                address,
                images,
                index + 1
              );
            } else {
              var ID = function () {
                // Generate random key
                return "_" + Math.random().toString(36).substr(2, 9);
              };

              const id = ID();

              firebase
                .firestore()
                .collection("feed")
                .doc(id)
                .set({
                  id,
                  name,
                  price,
                  condition,
                  description,
                  address,
                  imageURL: imageURLArray,
                  userID: firebase.auth().currentUser.uid,
                })
                .then(() => {
                  // alert("Your item has been uploaded successfully!");
                  setLoadingVisibility(false);
                  setAnimationVisibility(true);
                });

              imageURLArray.length = 0;
            }
          })
          .catch((error) => alert(error));
      }
    );
  };

  const handleSubmit = (
    { name, price, condition, description, address, images },
    { resetForm }
  ) => {
    setLoadingLength(0);
    setLoadingNumber(0);
    setModalVisibility(true);
    setLoadingVisibility(true);
    try {
      uploadItem(name, price, condition, description, address, images, 0);
      resetForm();
    } catch (error) {
      alert("Error! " + error.message);
    }
  };

  return props.currentUser !== null ? (
    <>
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
        <Formik
          initialValues={{
            name: "",
            price: "",
            condition: "",
            description: "",
            address: "",
            // category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            errors,
            setFieldTouched,
            setFieldValue,
            values,
            touched,
            handleSubmit,
          }) => (
            <>
              <View style={styles.MainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ marginTop: 20 }} />

                  <FormImagePicker name={"images"} />

                  <Text style={styles.PrimaryText}>Name of Item</Text>
                  <PrimaryInputBox
                    height={35}
                    icon={
                      <FontAwesome
                        name="shopping-cart"
                        size={15}
                        color={colors.main_fg}
                      />
                    }
                    autoCapotalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("name")}
                    onChangeText={(text) => setFieldValue("name", text)}
                    value={values["name"]}
                    placeholder={"Name"}
                  />
                  <ErrorMessage
                    error={errors["name"]}
                    visible={touched["name"]}
                  />

                  <Text style={styles.PrimaryText}>Price</Text>
                  <PrimaryInputBox
                    height={35}
                    icon={
                      <FontAwesome
                        name="rupee"
                        size={15}
                        color={colors.main_fg}
                      />
                    }
                    autoCapotalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("price")}
                    onChangeText={(text) => setFieldValue("price", text)}
                    value={values["price"]}
                    placeholder={"Price in Rupees"}
                    keyboardType={"phone-pad"}
                  />
                  <ErrorMessage
                    error={errors["price"]}
                    visible={touched["price"]}
                  />

                  <Text style={styles.PrimaryText}>Condition</Text>
                  <PrimaryInputBox
                    height={35}
                    icon={
                      <FontAwesome
                        name="star"
                        size={15}
                        color={colors.main_fg}
                      />
                    }
                    autoCapotalize="none"
                    autoCorrect={false}
                    maxLength={1}
                    onBlur={() => setFieldTouched("condition")}
                    onChangeText={(text) => setFieldValue("condition", text)}
                    value={values["condition"]}
                    placeholder={"Condition of the item (rate out of 5)"}
                    keyboardType={"phone-pad"}
                  />
                  <ErrorMessage
                    error={errors["condition"]}
                    visible={touched["condition"]}
                  />

                  <Text style={styles.PrimaryText}>Description</Text>
                  <PrimaryInputBox
                    height={150}
                    icon={
                      <FontAwesome
                        name="file-text-o"
                        size={15}
                        color={colors.main_fg}
                      />
                    }
                    autoCapotalize="none"
                    autoCorrect={false}
                    maxLength={1024}
                    onBlur={() => setFieldTouched("description")}
                    onChangeText={(text) => setFieldValue("description", text)}
                    value={values["description"]}
                    placeholder={"Short description of the item"}
                    multiline
                  />
                  <ErrorMessage
                    error={errors["description"]}
                    visible={touched["description"]}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <SpecialInputBox
                      height={35}
                      icon={
                        <FontAwesome
                          name="phone"
                          size={15}
                          color={colors.main_fg}
                        />
                      }
                      text={
                        "+91 " +
                        props.currentUser.number.toString().substr(0, 3) +
                        "-" +
                        props.currentUser.number.toString().substr(3, 3) +
                        "-" +
                        props.currentUser.number.toString().substr(6)
                      }
                    />
                    <FormSpecialInputBox
                      // name={"category"}
                      selectedItem={category}
                      selectedIcon={icon}
                      onSelectedItem={(item) => setCategory(item)}
                      onSelectedIcon={(icon) => setIcon(icon)}
                      items={PickerBoxes}
                      icon={
                        <MaterialIcons
                          name="category"
                          size={15}
                          color={colors.main_fg}
                        />
                      }
                      height={35}
                      text={"Select Category"}
                    />
                  </View>

                  <ErrorMessage
                    error={errors["category"]}
                    visible={touched["category"]}
                  />

                  <Text style={styles.PrimaryText}>Address</Text>
                  <PrimaryInputBox
                    height={150}
                    icon={
                      <FontAwesome
                        name="address-book-o"
                        size={15}
                        color={colors.main_fg}
                      />
                    }
                    autoCapotalize="none"
                    autoCorrect={false}
                    maxLength={1024}
                    onBlur={() => setFieldTouched("address")}
                    onChangeText={(text) => setFieldValue("address", text)}
                    value={values["address"]}
                    placeholder={"Address"}
                    multiline
                  />
                  <ErrorMessage
                    error={errors["address"]}
                    visible={touched["address"]}
                  />

                  <View style={{ marginTop: 20 }} />

                  <InfoContaierBox
                    map={require("../assets/original/map.png")}
                  />

                  <View style={{ alignItems: "center" }}>
                    <SubmitButton title={"Submit"} onPress={handleSubmit} />
                  </View>
                  <View style={{ marginBottom: 50 }} />
                </ScrollView>
              </View>
            </>
          )}
        </Formik>
      </View>
      <Modal visible={modalVisibility} animationType="slide">
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {loadingVisibility && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontSize: RFValue(11.5),
                  color: colors.secondary_text,
                  textAlign: "center",
                }}
              >
                Uploading item {loadingNumber} %
              </Text>
              <View
                style={{
                  height: 10,
                  width: 0.8 * Dimensions.get("screen").width,
                }}
              >
                <Progress.Bar
                  color={colors.main_fg}
                  unfilledColor={colors.pressing_bg}
                  progress={loadingLength}
                  height={10}
                  width={null}
                  borderRadius={5}
                />
              </View>
            </View>
          )}
          {animationVisibility && (
            <LottieView
              onAnimationFinish={() => {
                setModalVisibility(false);
                setAnimationVisibility(false);
              }}
              autoPlay
              loop={false}
              source={require("../assets/animations/done.json")}
            />
          )}
        </View>
      </Modal>
    </>
  ) : (
    <Screen>
      <ActivityIndicator visible={true} />
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
  MainContainer: {
    flex: 1,
    paddingHorizontal: 22,
  },
  PrimaryText: {
    alignSelf: "flex-start",
    marginLeft: 15,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.main_fg,
  },
  navigation: {
    flexDirection: "row",
    height: 55,
    width: Dimensions.get("screen").width,
    backgroundColor: colors.navigationBar,
    justifyContent: "space-around",
    alignItems: "center",
  },
  containerCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 8,
    borderColor: colors.navigationBar,
    backgroundColor: colors.main_fg,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(PostScreenModal);
