import React, { useState } from "react";
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

import Header from "../components/Header";
import PostScreenNavBar from "../components/PostScreenNavBar";
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
import { TouchableNativeFeedback } from "react-native-gesture-handler";

function PostScreenModal() {
  const location = useLocation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name of Item"),
    price: Yup.string().required().label("Price"),
    condition: Yup.string().required().min(1).max(1).label("Condition"),
    description: Yup.string().required().max(1024).label("Description"),
    address: Yup.string().required().max(1024).label("Address"),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select at least one image"),
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
  const [imageURIs, setImageURIs] = useState([]);

  // const handleAdd = (uri) => {
  //   setImageURIs([...imageURIs, uri]);
  // };

  // const handleRemove = (uri) => {
  //   setImageURIs(imageURIs.filter((imageURI) => imageURI != uri));
  // };

  return (
    // <Modal {...otherProps} animationType={"slide"}>
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
          category: null,
          images: [],
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
          <>
            <View style={styles.MainContainer}>
              <View style={styles.ContentContainer}>
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
                    onChangeText={handleChange("name")}
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
                    onChangeText={handleChange("price")}
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
                    onChangeText={handleChange("condition")}
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
                    onChangeText={handleChange("description")}
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
                      text={"+91 7809879090"}
                    />
                    <FormSpecialInputBox
                      name={"category"}
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
                    onChangeText={handleChange("address")}
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
                    <Text style={[styles.PrimaryText, { alignSelf: "center" }]}>
                      Submit before exiting
                    </Text>

                    <SubmitButton title={"Submit"} onPress={handleSubmit} />

                  </View>
                  <View style={{ marginBottom: 100 }} />
                </ScrollView>
              </View>
            </View>
            <PostScreenNavBar
              setImageArray={(state) => setImageURIs(state)}
              setCategory={(item) => setCategory(item)}
              setIcon={(icon) => setIcon(icon)}
            />
          </>
        )}
      </Formik>
    </View>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.main_bg,
  },
  MainHeaderContainer: {
    backgroundColor: colors.pressing_bg,
  },
  MainContainer: {
    flex: 1,
    paddingHorizontal: 22,
  },
  ContentContainer: {
    flex: 1,
  },
  PrimaryText: {
    alignSelf: "flex-start",
    marginLeft: 15,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.main_fg,
  },
});

export default PostScreenModal;
